const { send } = require('micro');
const { promisify } = require('util');
const { randomBytes } = require('crypto');
const { renderPage, renderError } = require('./_render');

const randomBytesAsync = promisify(randomBytes);

// Longest secret we'll generate, in characters. Anything bigger is a typo or
// abuse, and a few hundred MB would crash the function before it answered.
const MAX_LENGTH = 1000000;

module.exports = async (req, res) => {
  try {
    const raw = String((req.query && req.query.length) || '');

    // Not a number at all (/about-us, /robots.txt...) - it's a missing page, not a secret.
    if (!/^-?\d/.test(raw)) {
      renderPage(res, '404', 404);
      return;
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.setHeader('Allow', 'GET, HEAD');
      renderError(req, res, 405);
      return;
    }

    const length = parseInt(raw, 10);
    if (length === 0) {
      res.statusCode = 301;
      res.setHeader('Location', `/32`);
      res.end();
      return;
    }
    if (length < 0) {
      renderError(req, res, 400, 'The length has to be a positive number, like /32.');
      return;
    }
    if (length > MAX_LENGTH) {
      renderError(req, res, 413, `Secrets can be up to ${MAX_LENGTH.toLocaleString('en-GB')} characters long.`);
      return;
    }

    const randomString = (await randomBytesAsync(Math.ceil(length/2)))
      .toString('hex')
      .slice(0,length);
    send(res, 200, randomString);
  } catch (err) {
    console.error(err);
    renderError(req, res, 500);
  }
}
