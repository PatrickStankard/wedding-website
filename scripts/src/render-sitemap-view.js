const Mustache = require('mustache');
const fs = require('fs');
const beautify = require('js-beautify').html;
const path = require('path');

function renderSitemapView(filePath) {
    const xmlPath = `${process.env.PUBLIC_DIRECTORY_PATH}/sitemap/index.xml`;

    const template = fs.readFileSync(
        `${process.env.TEMPLATES_DIRECTORY_PATH}/sitemap.mustache`,
        'utf8',
    );

    const partials = {
        url: fs.readFileSync(
            `${process.env.TEMPLATES_DIRECTORY_PATH}/partials/sitemap/url.mustache`,
            'utf8',
        ),
    };

    let view = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    view.lastMod = new Date().toISOString();

    const rendered = Mustache.render(
        template,
        view,
        partials,
    );

    fs.writeFileSync(
        xmlPath,
        beautify(rendered),
        'utf8',
    );

    console.log(`${filePath} -> ${xmlPath}`);
}

module.exports = renderSitemapView;
