const fs = require('fs');
const path = require('path');

const VERSION = fs.readFileSync(path.join(__dirname, '..', 'VERSION.md'), 'utf-8').trim();

// SecretGen's first commit was in 2024 - the footer shows just that year
// until the current year moves past it, then a "2024-<current>" range.
const FIRST_YEAR = 2024;
const CURRENT_YEAR = new Date().getFullYear();
const COPYRIGHT_YEAR = CURRENT_YEAR === FIRST_YEAR ? String(FIRST_YEAR) : `${FIRST_YEAR}-${CURRENT_YEAR}`;

// Renders a template from templates/<name>.html, substituting __VERSION__ so
// every ?v= cache-buster (and the footer's displayed version) always matches
// VERSION.md instead of going stale like a hand-edited static file would.
function renderPage(res, name, statusCode = 200) {
  const raw = fs.readFileSync(path.join(__dirname, '..', 'templates', `${name}.html`), 'utf-8');
  const html = raw.replace(/__VERSION__/g, VERSION).replace(/__COPYRIGHT_YEAR__/g, COPYRIGHT_YEAR);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.statusCode = statusCode;
  res.end(html);
}

module.exports = { renderPage, VERSION };
