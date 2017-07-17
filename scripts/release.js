'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const paths = require('../config/paths');
const upload = require('./utils/upyun')

const viewDir = path.resolve(paths.appPath, getViewDir())
const viewFilePath = viewDir + '/' + getProjectName()

release()

function cutBuildedHtmlFile() {
  fs.moveSync(`${paths.appBuild}/index.html`,  viewFilePath, {overwrite: true})
}

function getProjectName() {
  if (process.env.VIEW_NAME) {
    return process.env.VIEW_NAME
  }
  const packageName = require(paths.appPackageJson).name
  if (packageName && packageName !== 'fe') {
    return packageName + '.html'
  }

  return 'index.html'
}

function getViewDir() {
  return process.env.VIEW_DIR || '../view'
}

async function release() {
  console.log('Release start...\n')

  console.log('copy html to view dir...\n')
  cutBuildedHtmlFile()

  console.log('deploy build dir to upyun...\n')
  await upload(paths.appBuild)

  console.log('Release success!')
}
