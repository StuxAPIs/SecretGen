<p align="center">
  <img src="https://global.media.stuxapis.net/secretgen/logo.svg" width="300" alt="SecretGen">
</p>

# SecretGen

A simple API which will generate secrets. Built & Maintained by [StuxAPIs](https://github.com/StuxAPIs), Hosted by [Stuxedo](https://stuxedo.com).

## Usage

- https://secretgen.stuxapis.net
- https://secretgen.stuxapis.net/32
- https://secretgen.stuxapis.net/64
- https://secretgen.stuxapis.net/128

Or in the command line:

```bash
curl https://secretgen.stuxapis.net/128
```

## Local development

```bash
npm install
npm run develop
```

`develop` runs `vercel dev`, serving the `api/[length].js` function locally.

## Branding

`logo.svg`/`icon.png` are hosted on the shared StuxAPIs media CDN at [global.media.stuxapis.net/secretgen](https://global.media.stuxapis.net/secretgen), not vendored in this repo. `/favicon.ico` redirects there too (see `vercel.json`), since this project has no HTML page of its own to declare a `<link rel="icon">`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — see [LICENSE](LICENSE).

## Copyright

(C) 2024-2026 Stux.Group. All rights reserved.

---

*Built & Maintained by <img src="https://global.media.stuxapis.net/icon.png" height="14" alt="StuxAPIs" valign="middle"> [StuxAPIs](https://github.com/StuxAPIs), Hosted by <img src="https://github.com/Stuxedo.png" height="14" alt="Stuxedo" valign="middle"> [Stuxedo](https://stuxedo.com).    
StuxAPIs is a part of the <img src="https://media.stux.group/global/icon.png" height="14" alt="Stux.Group" valign="middle"> Stux.Group brand of businesses.*
