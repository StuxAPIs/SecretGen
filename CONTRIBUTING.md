# Contributing to SecretGen

Thanks for your interest in contributing! SecretGen is a small Vercel serverless
function — contributions are welcome.

## Local setup

```bash
npm install
npm run develop
```

This runs `vercel dev`, which serves `api/[length].js` locally.

## Making a change

1. Fork the repository and create a branch for your change.
2. Keep pull requests focused — one change or fix per PR.
3. Make sure `npm run develop` still serves requests correctly for a few
   lengths (e.g. `/32`, `/64`, `/128`) before submitting.
4. Open a pull request with a clear description of what changed and why.

## Releases

Releases follow [Semantic Versioning](https://semver.org/):

1. Update [CHANGELOG.md](CHANGELOG.md) with what changed.
2. Bump [VERSION.md](VERSION.md).
3. Run `commit.sh` (or `commit.bat` on Windows) to commit and tag the release.

## Questions

Reach out at [contact@stuxapis.net](mailto:contact@stuxapis.net).
