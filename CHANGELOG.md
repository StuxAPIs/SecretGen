# Changelog

All notable changes to SecretGen are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
