/**
 * Counts page views on the server, for every visitor, consent or not, then
 * serves the static site as before. Only aggregate, non-identifying fields
 * are written: no IP address, no cookies, nothing read from or stored on the
 * device, no script in the browser.
 *
 * It also sends visitors whose browser asks for no Polish at all to the
 * English site, without a cookie (see `englishFor`).
 *
 * Query the counts with the Analytics Engine SQL API (see README).
 */

// Link-preview fetchers and crawlers, so posting a link does not count as a visit.
const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|whatsapp|headless/i;

export default {
  async fetch(request, env) {
    const english = englishFor(request);
    if (english) {
      return new Response(null, {
        status: 302,
        headers: { Location: english, Vary: 'Accept-Language', 'Cache-Control': 'no-store' },
      });
    }
    const response = await env.ASSETS.fetch(request);
    if (isPageView(request, response)) record(env, request, response);
    return response;
  },
};

// Polish pages with an English translation; mirrors `pages` in src/lib/routes.ts.
const ENGLISH = { '/': '/en', '/formularz': '/en/contribute' };

/**
 * The English URL for a visitor arriving from outside the site whose browser
 * accepts no Polish, or undefined to serve the page as asked. A link from
 * the site itself is never redirected, which is what keeps a visitor who
 * switched to Polish there; with no cookie, that choice lasts one visit.
 * No Accept-Language (most crawlers) means no redirect.
 *
 * @param {Request} request
 */
export function englishFor(request) {
  const url = new URL(request.url);
  const target = ENGLISH[url.pathname];
  const languages = request.headers.get('Accept-Language');
  if (!target || !languages || request.method !== 'GET') return undefined;
  if (BOT.test(request.headers.get('User-Agent') ?? '')) return undefined;
  if (hostOf(request.headers.get('Referer')) === url.hostname) return undefined;

  // "pl-PL,pl;q=0.9,en;q=0.8": any pl or pl-* tag with a quality above zero counts.
  const polish = languages.split(',').some((entry) => {
    const [tag, ...params] = entry.trim().toLowerCase().split(';');
    const q = params.find((p) => p.trim().startsWith('q='));
    return tag.split('-')[0] === 'pl' && (q === undefined || Number(q.trim().slice(2)) > 0);
  });
  return polish ? undefined : target + url.search;
}

/** @param {string | null} url */
function hostOf(url) {
  try {
    return new URL(url ?? '').hostname;
  } catch {
    // no or malformed URL: a direct visit
    return '';
  }
}

/** @param {Request} request @param {Response} response */
function isPageView(request, response) {
  return (
    request.method === 'GET' &&
    (response.headers.get('Content-Type') ?? '').startsWith('text/html') &&
    !BOT.test(request.headers.get('User-Agent') ?? '')
  );
}

/** @param {{ VISITS?: { writeDataPoint(point: object): void } }} env @param {Request} request @param {Response} response */
function record(env, request, response) {
  const url = new URL(request.url);
  const param = (name) => url.searchParams.get(name) ?? '';
  const referrer = hostOf(request.headers.get('Referer'));

  // blob order is the column order in SQL: blob1 = path, blob2 = utm_source, …
  env.VISITS?.writeDataPoint({
    indexes: [param('utm_source') || 'direct'],
    blobs: [
      url.pathname,
      param('utm_source'),
      param('utm_medium'),
      param('utm_campaign'),
      param('utm_content'),
      referrer === url.hostname ? '' : referrer,
      request.cf?.country ?? '',
      String(response.status),
    ],
    doubles: [1],
  });
}
