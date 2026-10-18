const { readFile, writeFile } = require('node:fs/promises');
const path = require('node:path');
const CleanCSS = require('clean-css');
const { minify } = require('terser');
const root = path.join(__dirname, '..');

const javascriptSources = [
    'js/modernizr.custom.js',
    'js/triple.layout.js',
    'js/nprogress/nprogress.js',
    'js/fastclick.js',
    'js/jquery.imagesloaded.min.js',
    'js/jquery.isotope.min.js',
    'js/jquery.validate.min.js',
    'js/fancy3.js',
    'js/guestures.js',
    'js/google-code-prettify/prettify.js',
    'js/send-mail.js',
    'js/classie.js',
    'js/main.js'
];

const stylesheetSources = [
    'js/nprogress/nprogress.css',
    'js/google-code-prettify/prettify.css',
    'css/print.css',
    'css/normalize.css',
    'css/animate.css',
    'css/fancy.min.css',
    'css/flexslider.css',
    'css/style.css',
    'css/main.css',
    'css/custom.css'
];

async function concatenate(sources) {
    const contents = await Promise.all(sources.map(async (source) => {
        const content = await readFile(path.join(root, source), 'utf8');
        return content.replace(/^\uFEFF/, '');
    }));
    return contents.join('\n');
}

async function packJs() {
    const bundle = await concatenate(javascriptSources);
    const result = await minify(bundle, { format: { comments: 'some' } });

    if (!result.code) {
        throw new Error('JavaScript minification produced no output.');
    }

    await Promise.all([
        writeFile(path.join(root, 'js/bundle.js'), bundle),
        writeFile(path.join(root, 'js/bundle-min.js'), result.code)
    ]);
}

async function packCss() {
    const bundle = await concatenate(stylesheetSources);
    const result = new CleanCSS({ rebase: false }).minify(bundle);

    if (result.errors.length) {
        throw new Error(result.errors.join('\n'));
    }

    await writeFile(path.join(root, 'css/main-stylesheet.css'), result.styles);
}

async function build() {
    const args = process.argv.slice(2);
    if (args.length > 1 || (args.length === 1 && !['--js', '--css'].includes(args[0]))) {
        throw new Error('Usage: node scripts/build.cjs [--js|--css]');
    }
    if (!args.length || args[0] === '--js') await packJs();
    if (!args.length || args[0] === '--css') await packCss();
}

build().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
});
