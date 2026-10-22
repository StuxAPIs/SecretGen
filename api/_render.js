const fs = require('fs');
const path = require('path');

const VERSION = fs.readFileSync(path.join(__dirname, '..', 'VERSION.md'), 'utf-8').trim();

// SecretGen's first commit was in 2024 - the footer shows just that year
// until the current year moves past it, then a "2024–<current>" range.
// Worked out per request, so a long-lived function rolls over on 1 January.
const FIRST_YEAR = 2024;
function copyrightYears() {
  const now = new Date().getFullYear();
  return now <= FIRST_YEAR ? String(FIRST_YEAR) : `${FIRST_YEAR}–${now}`;
}

// Error pages rendered with templates/error.html (404 has its own template).
// Vercel's own 502/504 pages (function crashed or timed out before answering)
// can't be replaced, so anything the function can catch is answered here.
const ERROR_PAGES = {
  400: ['Bad Request', "That request didn't make sense to us."],
  405: ['Method Not Allowed', 'Secrets are fetched with a GET request.'],
  413: ['Too Long', 'That secret is longer than we generate.'],
  500: ['Something Went Wrong', 'Something broke on our side. Please try again in a moment.'],
};

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

// Renders a template from templates/<name>.html, substituting __VERSION__ so
// every ?v= cache-buster (and the footer's displayed version) always matches
// VERSION.md instead of going stale like a hand-edited static file would.
// Any extra vars replace their own __KEY__ placeholders, HTML-escaped.
function renderPage(res, name, statusCode = 200, vars = {}) {
  let html = fs.readFileSync(path.join(__dirname, '..', 'templates', `${name}.html`), 'utf-8');
  for (const [key, value] of Object.entries(vars)) {
    html = html.split(`__${key}__`).join(escapeHtml(value));
  }
  html = html.replace(/__VERSION__/g, VERSION).replace(/__COPYRIGHT_YEAR__/g, copyrightYears());

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.statusCode = statusCode;
  res.end(html);
}

// Browsers get the branded page; curl and scripts get a one-line plain-text
// error, since that's what they get on success too.
function renderError(req, res, statusCode, detail) {
  const [title, message] = ERROR_PAGES[statusCode];
  const accept = (req.headers && req.headers.accept) || '';
  if (!accept.includes('text/html')) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.statusCode = statusCode;
    res.end(`${statusCode} ${title}: ${detail || message}\n`);
    return;
  }
  renderPage(res, 'error', statusCode, { CODE: statusCode, TITLE: title, MESSAGE: detail || message });
}

module.exports = { renderPage, renderError, ERROR_PAGES, VERSION };
