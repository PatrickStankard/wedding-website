#!/usr/bin/env node

const renderPageViews = require('./src/render-page-views.js');
const renderSitemapView = require('./src/render-sitemap-view.js');

renderSitemapView(`${process.env.VIEWS_DIRECTORY_PATH}/sitemap.json`);
renderPageViews(`${process.env.VIEWS_DIRECTORY_PATH}/pages`);
