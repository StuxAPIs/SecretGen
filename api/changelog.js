const fs = require('fs');
const path = require('path');

const VERSION = fs.readFileSync(path.join(__dirname, '..', 'VERSION.md'), 'utf-8').trim();

const CHANGELOG_LABELS = {
  Added: 'added',
  Changed: 'changed',
  Fixed: 'fixed',
  Removed: 'removed',
  Deprecated: 'deprecated',
  Security: 'security',
};

function styliseChangelog(html) {
  html = html.replace(/<h3>(\w+)<\/h3>/g, (match, word) => {
    const slug = CHANGELOG_LABELS[word];
    if (!slug) return match;
    return `<p class="cl-label cl-label-${slug}">${word}</p>`;
  });
  return html.replace(/<ul>/g, '<ul class="cl-list">');
}

module.exports = async (req, res) => {
  // marked v18+ is ESM-only (no "require" export condition), so it must be
  // loaded via dynamic import - a plain require() throws ERR_REQUIRE_ESM on
  // Vercel's Node runtime.
  const { marked } = await import('marked');

  const raw = fs.readFileSync(path.join(__dirname, '..', 'CHANGELOG.md'), 'utf-8');

  // Drop the leading "# Changelog" title and intro prose - the page
  // already has its own header, and the version/date headings are what
  // actually matter here.
  const body = raw.replace(/^# Changelog\n[\s\S]*?(?=\n## )/, '');
  const changelogHtml = styliseChangelog(marked.parse(body));

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Changelog - SecretGen</title>
<meta name="theme-color" content="#6366f1">
<link rel="icon" type="image/png" href="https://global.media.stuxapis.net/secretgen/icon.png">
<link href="/assets/style.css?v=${VERSION}" type="text/css" rel="stylesheet">
</head>
<body class="legal-body">
<a class="legal-back" href="/">&larr; Back to SecretGen</a>
<h1>Changelog</h1>
<div class="changelog-body">
${changelogHtml}</div>
<footer class="legal-footer">
  <p><a href="/legal">Boring Legal Stuff</a> &middot; <a href="/about">About</a></p>
</footer>
</body>
</html>
`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.statusCode = 200;
  res.end(html);
};
