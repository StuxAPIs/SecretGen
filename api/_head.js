// Shared <head> pieces: the favicon/icon tags every page prints, and the
// Discord component embed (a custom link preview; Open Graph stays as the fallback).

const SITE_NAME = 'SecretGen';
const SITE_URL = 'https://secretgen.stuxapis.net';
const SITE_COLOUR = 0x6366f1;
const ICON_URL = 'https://global.media.stuxapis.net/secretgen/icon.png';
const DISCORD_EMBED_MAX_BYTES = 3000;

// The icon tags for every page with a <head>: favicon.ico for tabs, a PNG for
// browsers that prefer it, an opaque apple-touch-icon and the web manifest.
function faviconTags() {
  return '<link rel="icon" href="/favicon.ico" sizes="48x48">\n'
    + '<link rel="icon" type="image/png" sizes="512x512" href="/assets/icons/icon-512.png">\n'
    + '<link rel="apple-touch-icon" href="/apple-touch-icon.png">\n'
    + '<link rel="manifest" href="/site.webmanifest">';
}

// Escapes Discord markdown so data (names, descriptions) shows as plain text.
// Inline formatting, link brackets and backslashes anywhere; headings, quotes
// and lists only at a line start. '\\$1' is a literal backslash then the match.
function discordMd(s) {
  return String(s)
    .replace(/([\\*_~`|[\]])/g, '\\$1')
    .replace(/^([#>-])/gm, '\\$1');
}

function discordText(markdown) {
  return { type: 10, content: markdown };
}

// A row of link buttons: [[label, absolute URL], ...].
function discordButtons(links) {
  return {
    type: 1,
    components: links.map(([label, url]) => ({ type: 2, style: 5, label: String(label).slice(0, 80), url })),
  };
}

// Text with the SecretGen icon beside it.
function discordSection(markdown) {
  return { type: 9, components: [discordText(markdown)], accessory: { type: 11, media: { url: ICON_URL } } };
}

// Encodes a payload, or returns null when it's over Discord's 3,000-byte limit.
function discordPayload(components) {
  const payload = { component: { type: 17, accent_color: SITE_COLOUR, components } };
  // can't close the <script> early; costs 1 byte only where needed
  const json = JSON.stringify(payload).replace(/<\//g, '<\\/');
  return Buffer.byteLength(json) > DISCORD_EMBED_MAX_BYTES ? null : json;
}

// The <script> tag, or a comment when it would be over the limit (Discord then
// shows the Open Graph preview instead).
function discordEmbed(components) {
  const json = discordPayload(components);
  return json === null
    ? `<!-- discord:component-embed left out: over ${DISCORD_EMBED_MAX_BYTES} bytes -->`
    : `<script id="discord:component-embed" type="application/json">${json}</script>`;
}

const siteLabel = () => `-# [${SITE_NAME}](${SITE_URL}/)\n`;

// The homepage: what SecretGen is, the key facts, and a few links.
function discordHomeEmbed() {
  return discordEmbed([
    discordSection(`# [${SITE_NAME}](${SITE_URL}/)\n**A simple API which will generate secrets.**\n`
      + 'Request `/32` for a random 32-character secret, or any length up to 1,000,000.'),
    { type: 14 },
    discordText(`### Try it\n[${SITE_URL}/32](${SITE_URL}/32)\n-# Cryptographically random, no auth, no rate limits.`),
    discordButtons([['Generate a secret', `${SITE_URL}/32`], ['About', `${SITE_URL}/about`], ['StuxAPIs', 'https://stuxapis.net']]),
  ]);
}

// Any other page: its name and description, with a way back to the generator.
function discordPageEmbed(title, desc, url) {
  return discordEmbed([
    discordSection(`${siteLabel()}## [${discordMd(title)}](${url})\n${discordMd(desc)}`),
    discordButtons([['Open', url], [SITE_NAME, `${SITE_URL}/`]]),
  ]);
}

// Pages that get an embed, by template name: [title, description, path]. The
// homepage has its own builder; 404 and error pages get none.
const PAGES = {
  about: ['About SecretGen', 'A free, public API that generates cryptographically random secrets.', '/about'],
  legal: ['Boring Legal Stuff', 'Privacy, terms, cookies and the rest of the legal pages for SecretGen.', '/legal'],
  'legal-privacy': ['Privacy Policy', 'How SecretGen handles your data.', '/legal/privacy'],
  'legal-terms': ['Terms and Ethics', 'The terms for using SecretGen.', '/legal/terms'],
  'legal-cookies': ['Cookies Policy', 'What cookies SecretGen does and does not use.', '/legal/cookies'],
  'legal-imprint': ['Imprint', 'Who is behind SecretGen.', '/legal/imprint'],
  'legal-disclaimer': ['Disclaimer', 'The disclaimer for using SecretGen.', '/legal/disclaimer'],
  'legal-opt-out': ['Opt-Out Preferences', 'Your opt-out preferences for SecretGen.', '/legal/opt-out'],
  changelog: ['Changelog', 'Every release of SecretGen and what changed in it.', '/changelog'],
};

// The embed for a template name, or '' for pages that get none (404, errors).
function discordEmbedFor(name) {
  if (name === 'index') return discordHomeEmbed();
  const page = PAGES[name];
  return page ? discordPageEmbed(page[0], page[1], SITE_URL + page[2]) : '';
}

module.exports = { faviconTags, discordEmbedFor, discordMd, discordPayload, discordPageEmbed, discordHomeEmbed, PAGES, SITE_URL };
