'use strict';

const fs = require('fs');

module.exports = {
  loadModules (directory, app) {
    const dirPath = `${directory}`.split('/').filter(str => str.length);
    const dirPathStr = dirPath.join('/');

    if (!fs.existsSync(dirPathStr)) throw new Error(`Specified directory name does not exists: ${directory}`);

    const fileNames = fs.readdirSync(dirPathStr);

    for (let file of fileNames) {
      const pathAbsolute = `${dirPathStr}/${file}`;
      const pathRelative = [...dirPath, file].join('/');

      const isDir = fs.statSync(pathAbsolute).isDirectory();
      if(isDir) this.loadModules(pathRelative, app);
      else require(`../../${pathRelative}`)(app);
    }
  },

  loadResponses (directory, app) {
    const dirPath = `${directory}`.split('/').filter(str => str.length);
    const dirPathStr = dirPath.join('/');
    const customResponses = {};

    if (!fs.existsSync(dirPathStr)) throw new Error(`Specified directory name does not exists: ${directory}`);

    const fileNames = fs.readdirSync(dirPathStr);
    for (let file of fileNames) {
      const pathRelative = [...dirPath, file].join('/');
      const respName = file.replace(/\.js$/, '');

      customResponses[respName] = require(`../../${pathRelative}`);
    }

    app.use((req, res, next) => {

      for (let respName in customResponses) {
        res[respName] = customResponses[respName].bind(res);
      }
      res.send = res.send.bind(res);
      next();
    });
  },

  loadErrorMessages (directory) {
    const dirPath = `${directory}`.split('/').filter(str => str.length);
    return require(`../${[...dirPath].join('/')}`);
  },

  loadTemplate (path) {
    const _path = `${path}`.split('/').filter(str => str.length);
    return fs.readFileSync(`${[..._path].join('/')}`).toString();
  },

  loadValidPatterns (directory) {
    const dirPath = `${directory}`.split('/').filter(str => str.length);
    const dirPathStr = dirPath.join('/');

    if (!fs.existsSync(dirPathStr)) throw new Error(`Specified directory name does not exists: ${directory}`);

    const fileNames = fs.readdirSync(dirPathStr);
    global.patterns = {};
    for (let file of fileNames) {
      const pathRelative = [...dirPath, file].join('/');
      const respName = file.replace(/\.js$/, '');

      global.patterns[respName] = require(`../../${pathRelative}`)[respName.toLowerCase()];
    }
  },
};
