Incase of a chrome browser not found error. Add the following line of code to a puppeteer.config.cjs file and npm uninstall then npm install puppeteer. You should be able to see the new .cache folder generated in the root directory. Now the cache directory is officially changed and there should be no problem running the app.


const {join} = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};


IMPORTANT NOTE:

When uploading to the repo, it is best to remove the node_modules folder, so when the repository is cloned, when running NPM Install, the modules will be installed from the package.json dependencies, thus, creating a fresh new copy of .cache for puppeteer.





IF you want to keep the .cache and browser local, then create a batch file called Install.bat containing the following:

cd node_modules\puppeteer
node install.mjs


Run that script before starting the server to force the browser download




If you place the puppeteer.config.cjs in the root, then the Install.bat will install the .cache folder in the root directory of your app.