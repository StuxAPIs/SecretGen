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

Pages are templates in `templates/`, rendered by `api/_render.js`, which fills in
the version (also the `?v=` cache-buster), the footer year and the shared `<head>`
tags (icons and the Discord embed, from `api/_head.js`). Every template with a
`<head>` needs the `__ICONS__` placeholder; pages other than 404 and error pages
also take `__DISCORD__`. Run `npm test` before a release.

- **Icons**: `favicon.ico`, `apple-touch-icon.png`, `site.webmanifest` and `assets/icons/`
  are generated from the square icon; regenerate them if the icon changes.
- **Branding**: `logo.svg`/`icon.png` are hosted on the shared StuxAPIs media
  CDN at [global.media.stuxapis.net/secretgen](https://global.media.stuxapis.net/secretgen),
  not vendored in this repo — see the CDN if you need to change them.

## Questions

Reach out at [hello@stuxapis.net](mailto:hello@stuxapis.net).

## Versioning

This project uses [Date Versioning](https://datevers.ing). To release:

1. Add a `## vYY.MM.DD` entry at the top of `CHANGELOG.md`, with its sections in this order: Added, Changed, Fixed, Removed, Security, Deprecated.
2. Set `VERSION.md` to the same bare version (no `v`): today's **UTC** date as `YY.MM.DD`, or `YY.MM.DD-1`, `-2`… for later releases the same UTC day. Never a future date. Use UTC, not local time: just after midnight in the UK it is still the previous day in UTC.
3. Run `bash tests/version.sh`.
4. Run `./commit.sh` (or `commit.bat` on Windows). It checks the version, commits and tags `vYY.MM.DD`, and never pushes.
