# Abe Coleman's portfolio

The main site is static HTML, CSS, and JavaScript. A Node.js script combines the source
assets into the bundles loaded by `index.html`.

## Build

Use Node.js 24 (`nvm use` if you use nvm), then run:

```sh
npm ci
npm run build
npm run check
```

Edit the source files listed in `scripts/build.cjs`, then rebuild and commit the
generated files alongside your changes:

- `js/bundle.js`
- `js/bundle-min.js`
- `css/main-stylesheet.css`

To rebuild only one asset type, run `npm run build:js` or `npm run build:css`.
The stylesheet sources are CSS; there is no SCSS compilation step.

## Preview

For a static preview, run:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000>. This server does not apply Apache's `.htaccess`
configuration. To check redirects and error handling, use the existing Lando
configuration instead:

```sh
lando start
```

Lando serves the site at <https://abaracus.lndo.site>.

## Checks

GitHub Actions installs the locked dependencies, builds the bundles, checks
JavaScript syntax, and verifies that generated assets match the committed files.
