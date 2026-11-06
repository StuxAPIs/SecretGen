<p align="center">
  <img src="https://global.media.stuxapis.net/secretgen/logo.svg" width="300" alt="SecretGen">
</p>

# SecretGen

A simple API which will generate secrets. Built & Maintained by [StuxAPIs](https://github.com/StuxAPIs), Hosted by [Stuxedo](https://stuxedo.com).

## Usage

- https://secretgen.stuxapis.net/32
- https://secretgen.stuxapis.net/64
- https://secretgen.stuxapis.net/128

Any length from 1 to 1,000,000 works. Negative lengths return `400`, longer ones `413`, and requests other than `GET` return `405`.

Or in the command line:

```bash
curl https://secretgen.stuxapis.net/128
```

## Website

- Live: https://secretgen.stuxapis.net — a small landing page with usage examples; the secret-generation endpoints above are unaffected and always take priority over it
- About: [/about](https://secretgen.stuxapis.net/about)
- Legal: [/legal](https://secretgen.stuxapis.net/legal)
- Changelog: [/changelog](https://secretgen.stuxapis.net/changelog) — renders [CHANGELOG.md](CHANGELOG.md) as HTML via the `api/changelog.js` serverless function

## Local development

```bash
npm install
npm run develop
```

`develop` runs `vercel dev`, serving the `api/[length].js` function and the static pages locally. Or use the bundled dev server, which does the same setup for you:

```bash
./dev-server.sh      # Linux/macOS
dev-server.bat       # Windows
```

## Branding

`logo.svg`/`icon.png` are hosted on the shared StuxAPIs media CDN at [global.media.stuxapis.net/secretgen](https://global.media.stuxapis.net/secretgen), not vendored in this repo. `/favicon.ico` redirects there too (see `vercel.json`).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Versioning

This project uses [Date Versioning](https://datevers.ing): each release is numbered by its UTC release date as `YY.MM.DD` (for example `26.10.23`), with `-1`, `-2`… for later releases the same day. See [CHANGELOG.md](CHANGELOG.md) for what changed in each release.

Releases are committed and tagged on the `test` branch and reach `main` through a pull request from `test`, which needs CI to pass and is reviewed and merged by Leo; see [Branches](CONTRIBUTING.md#branches).

## License

MIT — see [LICENSE](LICENSE).

## Copyright

(C) 2024-2026 Stux.Group. All rights reserved.

---

*Built & Maintained by <picture><source media="(prefers-color-scheme: dark)" srcset="https://global.media.stuxapis.net/icon-light.png"><source media="(prefers-color-scheme: light)" srcset="https://global.media.stuxapis.net/icon-dark.png"><img src="https://global.media.stuxapis.net/icon-dark.png" height="14" alt="StuxAPIs" valign="middle"></picture> [StuxAPIs](https://github.com/StuxAPIs), Hosted by <img src="https://github.com/Stuxedo.png" height="14" alt="Stuxedo" valign="middle"> [Stuxedo](https://stuxedo.com).    
StuxAPIs is a part of the <picture><source media="(prefers-color-scheme: dark)" srcset="https://global.media.stux.group/icon-light.png"><source media="(prefers-color-scheme: light)" srcset="https://global.media.stux.group/icon-dark.png"><img src="https://global.media.stux.group/icon-dark.png" height="14" alt="Stux.Group" valign="middle"></picture> Stux.Group brand of businesses.*
