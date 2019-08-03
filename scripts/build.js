#!/usr/bin/env node

const Mustache = require('mustache');
const fs = require('fs');
const beautify = require('js-beautify').html;
const path = require('path');

const layoutTemplate = fs.readFileSync(
    `${process.env.TEMPLATES_DIRECTORY_PATH}/layout.mustache`,
    'utf8',
);

const layoutPartials = {
    header: fs.readFileSync(
        `${process.env.TEMPLATES_DIRECTORY_PATH}/partials/layout/header.mustache`,
        'utf8',
    ),
    headerNav: fs.readFileSync(
        `${process.env.TEMPLATES_DIRECTORY_PATH}/partials/layout/header-nav.mustache`,
        'utf8',
    ),
    headerNavItem: fs.readFileSync(
        `${process.env.TEMPLATES_DIRECTORY_PATH}/partials/layout/header-nav-item.mustache`,
        'utf8',
    ),
    content: fs.readFileSync(
        `${process.env.TEMPLATES_DIRECTORY_PATH}/partials/layout/content.mustache`,
        'utf8',
    ),
    footer: fs.readFileSync(
        `${process.env.TEMPLATES_DIRECTORY_PATH}/partials/layout/footer.mustache`,
        'utf8',
    ),
};

function renderViews(directoryPath) {
    fs.readdir(directoryPath, (error, files) => {
        if (error) {
            throw error;
        }

        for (const fileName of files) {
            if (fileName.startsWith('.')) {
                continue;
            }

            const filePath = path.join(directoryPath, fileName);

            if (fs.lstatSync(filePath).isDirectory()) {
                renderViews(filePath);
            } else {
                renderView(filePath);
            }
        }
    });
}

function renderView(filePath) {
    let htmlPath;
    const view = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (view.key === 'index') {
        htmlPath = `${process.env.PUBLIC_DIRECTORY_PATH}/index.html`;
    } else {
        htmlPath = `${process.env.PUBLIC_DIRECTORY_PATH}/${view.key}/index.html`;
    }

    const contentBody = fs.readFileSync(
        `${process.env.TEMPLATES_DIRECTORY_PATH}/partials/pages/${view.key}/content-body.mustache`,
        'utf8',
    );

    const partials = Object.assign({
        contentBody,
    }, layoutPartials);

    const rendered = Mustache.render(
        layoutTemplate,
        view,
        partials,
    );

    fs.writeFileSync(
        htmlPath,
        beautify(rendered),
        'utf8',
    );

    console.log(`${filePath} -> ${htmlPath}`);
}

renderViews(process.env.VIEWS_DIRECTORY_PATH);
