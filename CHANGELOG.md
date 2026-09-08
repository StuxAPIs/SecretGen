# Changelog

All notable changes to SecretGen are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v1.4.0

### Added
- `assets/app.js` — the landing page's "Generate a secret" button is now a real interactive generator: a length input (1-1024) plus a Generate button that fetches `/{length}` client-side and shows the result with a Copy button, instead of just linking straight to `/32`. Falls back to the old plain links (`/32`, `/64`, `/128`) inside a `<noscript>` block if JavaScript is disabled
- The generator auto-runs once on page load, so there's always a secret shown by default

### Changed
- `assets/style.css` gained styles for the new generator widget (input, result row, copy button, error text) — cache-busted alongside `app.js` on every HTML file that loads it

## v1.3.0

### Added
- A real landing page at `/` (`index.html`) — title, favicon, logo, tagline, and links to the usage examples. Previously `/` immediately generated and returned a raw secret (rewritten straight to `/api/0`, which itself 301-redirected to `/32`); the actual secret-generation endpoints (`/32`, `/64`, `/128`, etc.) are completely unaffected and still take priority in `vercel.json`'s routing
- A full legal hub at `/legal` (`legal.html`) with all six standard sub-pages (`legal-privacy.html`, `legal-terms.html`, `legal-cookies.html`, `legal-imprint.html`, `legal-disclaimer.html`, `legal-opt-out.html`), matching the convention used across every other StuxAPIs project with a website
- `assets/style.css` — a small self-contained stylesheet (dark theme, no external framework), adapted from Kittens'
- `dev-server.sh`/`dev-server.bat` — local dev launcher that installs Node dependencies if missing, then runs `vercel dev`. This project has no config.json/domain to force into a dev mode the way other projects do, since `vercel.json`'s routing is identical locally and in production
- Legal sub-page titles follow the `(Page) | Legal - SecretGen` format, with the hub itself titled just `Legal - SecretGen`

### Changed
- `vercel.json`'s `/` rewrite now points at `/index.html` instead of `/0`; new rewrites added for `/legal` and each `/legal/<slug>` route, all ordered before the catch-all `/(.*) → /api/$1` rewrite so the numbered secret endpoints keep resolving exactly as before

## v1.2.1

### Changed
- `assets/icon.png` is now uploaded to `https://global.media.stuxapis.net/secretgen/icon.png` and confirmed live — the local staging copy committed in v1.2.0 has been removed, matching how `logo.svg` was handled

## v1.2.0

### Added
- `assets/icon.png` — a square padlock icon cropped from `logo.svg`'s icon badge (512×512, transparent background), for use as this project's favicon. **Not yet uploaded to the CDN** — see note below.
- `/favicon.ico` now redirects to the icon (see `vercel.json`), since this project has no HTML page of its own to declare a `<link rel="icon">`

### Changed
- `logo.svg` moved from being vendored locally in this repo to the shared CDN at `https://global.media.stuxapis.net/secretgen/logo.svg` — `README.md`'s header logo was updated accordingly
- **Follow-up needed**: `assets/icon.png` is committed here only as a staging location — it needs to be uploaded to `https://global.media.stuxapis.net/secretgen/icon.png` (currently 403s), after which this local copy should be removed the same way `logo.svg` was

## v1.1.3

### Changed
- `README.md`'s footer "Built & Maintained by StuxAPIs" icon now uses StuxAPIs' own logo (`https://global.media.stuxapis.net/icon.png`) instead of the GitHub org avatar (`github.com/StuxAPIs.png`), now that StuxAPIs has real branding of its own

## v1.1.2

### Fixed
- `assets/logo.svg`'s viewBox was 480 wide with the wordmark at font-size 50 against a 96px-tall icon badge — much too small relative to the icon and with a lot of dead space to its right. Measured the actual rendered text dimensions (rather than guessing) and bumped to font-size 80 for a properly balanced icon/wordmark lockup, then tightened the viewBox from 480 to 530 to crop out the leftover empty space

## v1.1.1

### Fixed
- `package.json`'s `engines.node` bumped from `18.x` to `24.x` — Node 18 is discontinued and Vercel now rejects deploys pinned to it ("Found invalid or discontinued Node.js Version")

## v1.1.0

### Added
- `assets/logo.svg` — a full logo (padlock icon + "SecretGen" wordmark), replacing the generic Stux.Group fallback logo in `README.md`'s header now that the project has branding of its own

### Changed
- `README.md`'s tagline "Powered by StuxAPIs" replaced with "Built & Maintained by StuxAPIs, Hosted by Stuxedo" (both linked, to `github.com/StuxAPIs` and `stuxedo.com`), matching the branding used everywhere else in the org

## v1.0.5

### Changed
- `LICENSE` and `README.md` copyright year updated from `2024` to `2024-2026`

## v1.0.4

### Changed
- `README.md`'s footer brand-attribution block updated to the new two-line format (Built & Maintained by StuxAPIs, Hosted by Stuxedo / StuxAPIs is a part of the Stux.Group brand of businesses), replacing the older single-line disclaimer

## v1.0.3

### Changed
- This changelog's preamble now uses the standard Keep a Changelog wording

## v1.0.2

### Changed
- `README.md`'s "StuxAPIs is part of the Stux.Group Brand of Companies" line now includes the Stux.Group icon inline

## v1.0.1

### Changed
- `README.md`'s tagline now matches the repo's live GitHub description ("A simple API which will generate secrets. Powered by StuxAPIs.") instead of the older "simple web app" wording

## v1.0.0

### Added
- `VERSION.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `commit.sh`/`commit.bat` — brought the repo onto the standard StuxAPIs release flow (bump `VERSION.md`, update this changelog, run `commit.sh`/`commit.bat` to commit and tag `vX.Y.Z`)

### Changed
- `README.md` given a Stux.Group logo header, a local development section and license/copyright sections
- `LICENSE` copyright holder normalized to Stux.Group
