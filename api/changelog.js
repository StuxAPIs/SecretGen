const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const VERSION = fs.readFileSync(path.join(__dirname, '..', 'VERSION.md'), 'utf-8').trim();

module.exports = async (req, res) => {
  const raw = fs.readFileSync(path.join(__dirname, '..', 'CHANGELOG.md'), 'utf-8');

  // Drop the leading "# Changelog" title and intro prose - the page
  // already has its own header, and the version/date headings are what
  // actually matter here.
  const body = raw.replace(/^# Changelog\n[\s\S]*?(?=\n## )/, '');
  const changelogHtml = marked.parse(body);

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
