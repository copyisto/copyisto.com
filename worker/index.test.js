import assert from 'node:assert/strict';
import { test } from 'node:test';
import worker from './index.js';

const page = (status = 200, type = 'text/html; charset=utf-8') =>
  new Response('', { status, headers: { 'Content-Type': type } });

async function visit(url, { headers = {}, method = 'GET', response = page() } = {}) {
  const points = [];
  const env = {
    ASSETS: { fetch: async () => response },
    VISITS: { writeDataPoint: (point) => points.push(point) },
  };
  const request = new Request(url, { headers, method });
  Object.defineProperty(request, 'cf', { value: { country: 'PL' } });
  const served = await worker.fetch(request, env);
  assert.equal(served, response, 'the static response is passed through untouched');
  return points;
}

test('counts a campaign visit with its parameters and nothing identifying', async () => {
  const [point] = await visit(
    'https://copyisto.com/?utm_source=facebook&utm_medium=social&utm_campaign=post-2026-09-30',
    { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://l.facebook.com/' } },
  );
  assert.deepEqual(point.indexes, ['facebook']);
  assert.deepEqual(point.blobs, [
    '/',
    'facebook',
    'social',
    'post-2026-09-30',
    '',
    'l.facebook.com',
    'PL',
    '200',
  ]);
});

test('a visit without parameters is direct; an internal referrer is dropped', async () => {
  const [point] = await visit('https://copyisto.com/formularz', {
    headers: { Referer: 'https://copyisto.com/' },
  });
  assert.deepEqual(point.indexes, ['direct']);
  assert.equal(point.blobs[5], '');
});

test('skips link-preview bots, assets and non-GET requests', async () => {
  const fb = 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)';
  assert.equal((await visit('https://copyisto.com/', { headers: { 'User-Agent': fb } })).length, 0);
  assert.equal(
    (await visit('https://copyisto.com/favicon.ico', { response: page(200, 'image/x-icon') }))
      .length,
    0,
  );
  assert.equal((await visit('https://copyisto.com/', { method: 'POST' })).length, 0);
});

async function redirect(url, headers = {}) {
  const env = { ASSETS: { fetch: async () => page() }, VISITS: { writeDataPoint() {} } };
  const response = await worker.fetch(new Request(url, { headers }), env);
  return response.status === 302 ? response.headers.get('Location') : undefined;
}

const english = { 'Accept-Language': 'en-GB,en;q=0.9,de;q=0.5', 'User-Agent': 'Mozilla/5.0' };

test('sends a browser that accepts no Polish to the English page, keeping the campaign', async () => {
  assert.equal(await redirect('https://copyisto.com/?utm_source=x', english), '/en?utm_source=x');
  assert.equal(await redirect('https://copyisto.com/formularz', english), '/en/contribute');
});

test('serves the Polish page to anyone who accepts Polish, or who is already on the site', async () => {
  const withPolish = { 'Accept-Language': 'en-US,en;q=0.9,pl;q=0.3' };
  assert.equal(await redirect('https://copyisto.com/', withPolish), undefined);
  assert.equal(await redirect('https://copyisto.com/', { 'Accept-Language': 'pl-PL' }), undefined);
  // The switch back to Polish links from the site itself.
  const fromSite = { ...english, Referer: 'https://copyisto.com/en' };
  assert.equal(await redirect('https://copyisto.com/', fromSite), undefined);
});

test('does not redirect without a language, for bots, or for untranslated pages', async () => {
  assert.equal(await redirect('https://copyisto.com/', {}), undefined);
  const googlebot = { ...english, 'User-Agent': 'Googlebot/2.1' };
  assert.equal(await redirect('https://copyisto.com/', googlebot), undefined);
  assert.equal(await redirect('https://copyisto.com/polityka-prywatnosci', english), undefined);
  assert.equal(await redirect('https://copyisto.com/en', english), undefined);
  // q=0 means "not Polish", so it still redirects.
  const refused = { 'Accept-Language': 'en, pl;q=0' };
  assert.equal(await redirect('https://copyisto.com/', refused), '/en');
});
