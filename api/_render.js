const fs = require('fs');
const path = require('path');

const VERSION = fs.readFileSync(path.join(__dirname, '..', 'VERSION.md'), 'utf-8').trim();

// Renders a template from templates/<name>.html, substituting __VERSION__ so
// every ?v= cache-buster (and the footer's displayed version) always matches
// VERSION.md instead of going stale like a hand-edited static file would.
function renderPage(res, name) {
  const raw = fs.readFileSync(path.join(__dirname, '..', 'templates', `${name}.html`), 'utf-8');
  const html = raw.replace(/__VERSION__/g, VERSION);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.statusCode = 200;
  res.end(html);
}

module.exports = { renderPage, VERSION };
