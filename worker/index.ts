interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  DB: any;
  KAKAO_REST_API_KEY: string;
  KAKAO_CLIENT_SECRET: string;
  NAVER_CLIENT_ID: string;
  NAVER_CLIENT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
}

type Provider = 'kakao' | 'naver' | 'google';
const SESSION_COOKIE = 'aivexa_main_session';
const ORIGIN = 'https://aivexa.co.kr';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/auth/')) return env.ASSETS.fetch(request);
    try {
      await ensureSchema(env.DB);
      if (url.pathname === '/api/auth/session') return sessionResponse(request, env);
      if (url.pathname === '/api/auth/logout' && request.method === 'POST') return logout(request, env);
      const match = url.pathname.match(/^\/api\/auth\/(kakao|naver|google)(\/callback)?$/);
      if (!match) return json({ error: 'not_found' }, 404);
      const provider = match[1] as Provider;
      return match[2] ? oauthCallback(request, env, provider) : oauthStart(env, provider);
    } catch (error) {
      console.error(error);
      return Response.redirect(`${ORIGIN}/login?error=login_failed`, 302);
    }
  },
};

async function oauthStart(env: Env, provider: Provider) {
  const state = token();
  const callback = `${ORIGIN}/api/auth/${provider}/callback`;
  const config = providerConfig(env, provider);
  let target: URL;
  if (provider === 'kakao') {
    target = new URL('https://kauth.kakao.com/oauth/authorize');
    target.searchParams.set('response_type', 'code');
    target.searchParams.set('client_id', config.id);
    target.searchParams.set('redirect_uri', callback);
    target.searchParams.set('scope', 'account_email,profile_nickname');
  } else if (provider === 'naver') {
    target = new URL('https://nid.naver.com/oauth2.0/authorize');
    target.searchParams.set('response_type', 'code');
    target.searchParams.set('client_id', config.id);
    target.searchParams.set('redirect_uri', callback);
  } else {
    target = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    target.searchParams.set('response_type', 'code');
    target.searchParams.set('client_id', config.id);
    target.searchParams.set('redirect_uri', callback);
    target.searchParams.set('scope', 'openid email profile');
    target.searchParams.set('prompt', 'select_account');
  }
  target.searchParams.set('state', state);
  return redirect(target.toString(), `aivexa_oauth_${provider}=${state}; Path=/; Max-Age=600; HttpOnly; Secure; SameSite=Lax`);
}

async function oauthCallback(request: Request, env: Env, provider: Provider) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  if (!code || !state || cookie(request, `aivexa_oauth_${provider}`) !== state) return Response.redirect(`${ORIGIN}/login?error=invalid_state`, 302);
  const profile = await exchangeProfile(env, provider, code, state);
  const now = new Date().toISOString();
  await env.DB.prepare(`INSERT INTO members(provider,provider_id,email,name,created_at,updated_at) VALUES(?,?,?,?,?,?)
    ON CONFLICT(provider,provider_id) DO UPDATE SET email=excluded.email,name=excluded.name,updated_at=excluded.updated_at`)
    .bind(provider, profile.id, profile.email, profile.name, now, now).run();
  const session = token() + token();
  await env.DB.prepare('INSERT INTO member_sessions(token_hash,provider,provider_id,expires_at,created_at) VALUES(?,?,?,?,?)')
    .bind(await digest(session), provider, profile.id, new Date(Date.now() + 2592000000).toISOString(), now).run();
  return redirect(`${ORIGIN}/account`, `${SESSION_COOKIE}=${session}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`);
}

async function sessionResponse(request: Request, env: Env) {
  const session = cookie(request, SESSION_COOKIE);
  if (!session) return json({ user: null }, 401);
  const row = await env.DB.prepare(`SELECT m.email,m.name,m.provider FROM member_sessions s JOIN members m
    ON m.provider=s.provider AND m.provider_id=s.provider_id WHERE s.token_hash=? AND s.expires_at>?`)
    .bind(await digest(session), new Date().toISOString()).first();
  return row ? json({ user: { email: row.email, fullName: row.name, provider: row.provider } }) : json({ user: null }, 401);
}

async function logout(request: Request, env: Env) {
  const session = cookie(request, SESSION_COOKIE);
  if (session) await env.DB.prepare('DELETE FROM member_sessions WHERE token_hash=?').bind(await digest(session)).run();
  return new Response(null, { status: 204, headers: { 'Set-Cookie': `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax` } });
}

async function exchangeProfile(env: Env, provider: Provider, code: string, state: string) {
  const config = providerConfig(env, provider);
  const callback = `${ORIGIN}/api/auth/${provider}/callback`;
  const body = new URLSearchParams({ grant_type: 'authorization_code', client_id: config.id, code, redirect_uri: callback });
  if (config.secret) body.set('client_secret', config.secret);
  if (provider === 'naver') body.set('state', state);
  const tokenUrl = provider === 'kakao' ? 'https://kauth.kakao.com/oauth/token' : provider === 'naver' ? 'https://nid.naver.com/oauth2.0/token' : 'https://oauth2.googleapis.com/token';
  const tokenData: any = await fetch(tokenUrl, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body }).then(r => r.json());
  if (!tokenData.access_token) throw new Error('token_exchange_failed');
  const profileUrl = provider === 'kakao' ? 'https://kapi.kakao.com/v2/user/me' : provider === 'naver' ? 'https://openapi.naver.com/v1/nid/me' : 'https://openidconnect.googleapis.com/v1/userinfo';
  const raw: any = await fetch(profileUrl, { headers: { Authorization: `Bearer ${tokenData.access_token}` } }).then(r => r.json());
  const p = provider === 'naver' ? raw.response : raw;
  const rawId = provider === 'google' ? p.sub : p.id;
  const email = provider === 'kakao' ? p.kakao_account?.email : p.email;
  const name = provider === 'kakao' ? p.kakao_account?.profile?.nickname : (p.name || p.nickname);
  if (rawId === undefined || rawId === null || !email) throw new Error('profile_failed');
  const id = String(rawId);
  return { id, email: String(email).toLowerCase(), name: name || String(email).split('@')[0] };
}

function providerConfig(env: Env, provider: Provider) {
  if (provider === 'kakao') return { id: env.KAKAO_REST_API_KEY, secret: env.KAKAO_CLIENT_SECRET };
  if (provider === 'naver') return { id: env.NAVER_CLIENT_ID, secret: env.NAVER_CLIENT_SECRET };
  return { id: env.GOOGLE_CLIENT_ID, secret: env.GOOGLE_CLIENT_SECRET };
}
async function ensureSchema(db: any) { await db.batch([
  db.prepare('CREATE TABLE IF NOT EXISTS members(provider TEXT NOT NULL,provider_id TEXT NOT NULL,email TEXT NOT NULL,name TEXT,created_at TEXT NOT NULL,updated_at TEXT NOT NULL,PRIMARY KEY(provider,provider_id))'),
  db.prepare('CREATE TABLE IF NOT EXISTS member_sessions(token_hash TEXT PRIMARY KEY,provider TEXT NOT NULL,provider_id TEXT NOT NULL,expires_at TEXT NOT NULL,created_at TEXT NOT NULL)'),
]); }
function cookie(request: Request, name: string) { const value = request.headers.get('Cookie')?.split(';').map(v => v.trim()).find(v => v.startsWith(`${name}=`)); return value ? decodeURIComponent(value.slice(name.length + 1)) : null; }
function redirect(location: string, setCookie: string) { return new Response(null, { status: 302, headers: { Location: location, 'Set-Cookie': setCookie } }); }
function json(value: unknown, status = 200) { return new Response(JSON.stringify(value), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } }); }
function token() { const bytes = crypto.getRandomValues(new Uint8Array(24)); return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
async function digest(value: string) { const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)); return [...new Uint8Array(bytes)].map(v => v.toString(16).padStart(2, '0')).join(''); }
