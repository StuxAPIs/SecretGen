# Contributing to SecretGen

Thanks for your interest in contributing! SecretGen is a small Vercel serverless
function plus a static landing/legal site — contributions are welcome.

## Local setup

```bash
npm install
npm run develop
```

This runs `vercel dev`, which serves `api/[length].js` and the static
pages (`index.html`, `legal.html`, `legal-*.html`) locally, using the same
`vercel.json` routing as production. Or use the bundled dev server, which
does the same `npm install` bootstrap for you:

```bash
./dev-server.sh      # Linux/macOS
dev-server.bat       # Windows
```

## Making a change

1. Fork the repository and create a branch for your change.
2. Keep pull requests focused — one change or fix per PR.
3. Make sure `npm run develop` still serves requests correctly for a few
   lengths (e.g. `/32`, `/64`, `/128`) before submitting.
4. Open a pull request with a clear description of what changed and why.

## Static assets

This is a static site with no build step or templating, so a few things have
to be kept in sync by hand on any release that touches them:

- **Cache-busting**: `/assets/style.css` (every HTML file) and `/assets/app.js`
  (`index.html` only) are each referenced with `?v=<version>`. Bump it
  everywhere it appears alongside `VERSION.md` if you change either file.
- **Footer year/version**: `index.html`'s footer copyright year and version
  string are hardcoded and need updating by hand alongside a release.
- **Branding**: `logo.svg`/`icon.png` are hosted on the shared StuxAPIs media
  CDN at [global.media.stuxapis.net/secretgen](https://global.media.stuxapis.net/secretgen),
  not vendored in this repo — see the CDN if you need to change them.

## Releases

Releases follow [Semantic Versioning](https://semver.org/):

1. Update [CHANGELOG.md](CHANGELOG.md) with what changed.
2. Bump [VERSION.md](VERSION.md).
3. Run `commit.sh` (or `commit.bat` on Windows) to commit and tag the release.

## Questions

Reach out at [contact@stuxapis.net](mailto:contact@stuxapis.net).
