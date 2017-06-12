'use strict'

const read = require('fs-readdir-recursive');
const upyun = require('upyun.io');
const path = require('path');
const paths = require('../../config/paths');

const upyunConfig = require(paths.appUpyunConfig)
const upyunClient = upyun(upyunConfig)

module.exports = async (dir) => {
  const prefix = getUpyunPathPrefix()
  const files = read(dir).map(p => {
    return {
      name: p,
      path: path.resolve(dir, p)
    }
  })
  
  return await Promise.all(files.map(file => {
      const dest = prefix + file.name
      return upyunClient.putFile(file.path, dest)
    })
  )
}

function getUpyunPathPrefix() {
  const pkgName = require(paths.appPackageJson).name
  if (!pkgName || pkgName === 'fe') {
    throw new Error('Please use meaningful string for package.name')
  }
  if (pkgName.endsWith('-fe')) {
    return pkgName + '/'
  }
  return pkgName + '-fe/'
}