// Run with: npm test   (node --test, no extra dependencies)
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const { discordMd, discordPayload } = require('../api/_head');

// Calls a Vercel-style handler with a fake response and returns what it sent.
async function call(file, req = {}) {
  const res = {
    headers: {}, statusCode: 200, body: '',
    setHeader(k, v) { this.headers[k] = v; },
    end(b) { this.body = b === undefined ? '' : String(b); },
  };
  await require(path.join(root, 'api', file))({ headers: { accept: 'text/html' }, method: 'GET', ...req }, res);
  return res;
}

const PAGES = ['index', 'about', 'legal', 'legal-privacy', 'legal-terms', 'legal-cookies', 'legal-imprint',
  'legal-disclaimer', 'legal-opt-out', 'changelog'];
const ALLOWED = new Set([1, 2, 9, 10, 11, 12, 14, 17]);

function embedOf(html) {
  const m = html.match(/<script id="discord:component-embed" type="application\/json">([\s\S]*?)<\/script>/);
  return m ? m[1] : null;
}

function walk(node, fn) {
  fn(node);
  (node.components || []).forEach((c) => walk(c, fn));
  if (node.accessory) walk(node.accessory, fn);
}

test('VERSION.md matches the newest changelog heading and package.json (SemVer form)', () => {
  const version = fs.readFileSync(path.join(root, 'VERSION.md'), 'utf8').trim();
  const head = fs.readFileSync(path.join(root, 'CHANGELOG.md'), 'utf8').match(/^## v(\S+)/m)[1];
  assert.strictEqual(head, version);
  const [d, n] = version.split('-');
  const semver = `${d}${String(n ? Number(n) : 0).padStart(2, '0')}`;
  assert.strictEqual(require('../package.json').version, semver);
});

for (const name of PAGES) {
  test(`${name}: Discord embed is valid and under 3,000 bytes`, async () => {
    const res = await call(name);
    assert.strictEqual(res.statusCode, 200);
    const json = embedOf(res.body);
    assert.ok(json, 'embed present');
    assert.ok(Buffer.byteLength(json) <= 3000);
    const root_ = JSON.parse(json).component;
    assert.strictEqual(root_.type, 17);
    let count = 0;
    walk(root_, (n) => {
      count++;
      assert.ok(ALLOWED.has(n.type), `type ${n.type}`);
      if (n !== root_) assert.notStrictEqual(n.type, 17, 'no nested container');
      if (n.type === 2) {
        assert.strictEqual(n.style, 5);
        assert.deepStrictEqual(Object.keys(n).filter((k) => !['id', 'type', 'url', 'style', 'label', 'emoji', 'disabled'].includes(k)), []);
        assert.match(n.url, /^https?:\/\//);
      }
    });
    assert.ok(count <= 40);
    assert.ok(!json.includes('$1'));
    assert.ok(res.body.includes('rel="apple-touch-icon"') && res.body.includes('rel="manifest"'));
  });
}

test('404 and error pages have icons but no Discord embed', async () => {
  const nf = await call('404');
  assert.strictEqual(nf.statusCode, 404);
  assert.ok(!nf.body.includes('discord:component-embed'));
  assert.ok(nf.body.includes('href="/favicon.ico"'));
  const bad = await call('[length]', { query: { length: '-5' } });
  assert.strictEqual(bad.statusCode, 400);
  assert.ok(!bad.body.includes('discord:component-embed'));
  assert.ok(bad.body.includes('href="/favicon.ico"'));
});

test('Discord markdown is escaped and never prints "$1"', () => {
  assert.strictEqual(discordMd('a*b_c`d[e]\\f'), 'a\\*b\\_c\\`d\\[e\\]\\\\f');
  assert.strictEqual(discordMd('# head\n> quote\n- item'), '\\# head\n\\> quote\n\\- item');
  assert.ok(!discordMd('*').includes('$1'));
});

test('"</script>" in data cannot close the embed early', () => {
  const json = discordPayload([{ type: 10, content: 'x </script><b>' }]);
  assert.ok(!json.includes('</'));
  assert.strictEqual(JSON.parse(json).component.components[0].content, 'x </script><b>');
});

test('an over-limit embed is left out', () => {
  assert.strictEqual(discordPayload([{ type: 10, content: 'x'.repeat(3000) }]), null);
});

test('changelog page renders date-version headings with sections in the fixed order', async () => {
  const res = await call('changelog');
  assert.match(res.body, /<h2[^>]*>v\d{2}\.\d{2}\.\d{2}(-\d+)?<\/h2>/);
  const md = fs.readFileSync(path.join(root, 'CHANGELOG.md'), 'utf8');
  assert.match(md, /^## v\d{2}\.\d{2}\.\d{2}(-\d+)?$/m);
});

test('icon files, manifest and headers are in place', () => {
  for (const f of ['favicon.ico', 'apple-touch-icon.png', 'assets/icons/icon-192.png', 'assets/icons/icon-512.png', 'assets/icons/icon-maskable-512.png']) {
    assert.ok(fs.existsSync(path.join(root, f)), f);
  }
  const m = JSON.parse(fs.readFileSync(path.join(root, 'site.webmanifest'), 'utf8'));
  assert.strictEqual(m.start_url, '/');
  assert.ok(m.icons.some((i) => i.purpose === 'maskable' && i.sizes === '512x512'));
  const v = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
  assert.ok(JSON.stringify(v.headers).includes('application/manifest+json'));
  assert.ok(!JSON.stringify(v.redirects || []).includes('favicon.ico'));
});
