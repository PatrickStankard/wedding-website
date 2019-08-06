#!/usr/bin/env node

const uploadFiles = require('./src/upload-files.js');

uploadFiles(process.env.PUBLIC_DIRECTORY_PATH);
