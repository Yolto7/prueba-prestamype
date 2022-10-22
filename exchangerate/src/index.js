var pkg = require('../package.json');
const Utils = require("./common/util");
const { loadControllers, scopePerRequest } = require('awilix-express');
const { Lifetime } = require('awilix');
const { setup, container } = require('./container');
const dictMessage = require('./common/response-message')
require('./database');
setup();

const path = require('path');
const app = require('./app');
const config = require('./config');

app.use(scopePerRequest(container))

// load all services automatically
container.loadModules([toFwSlash(path.join(__dirname, 'services', '*.service.js'))], {
  // set them to be injected in camelCase
  formatName: 'camelCase',
  resolverOptions: {
    // we want all services to be scoped per request so we can inject certain variables
    lifetime: Lifetime.SCOPED
  }
});

// Loads all controllers in the `routes` folder
// relative to the current working directory.
// This is a glob pattern.
app.use(loadControllers('routes/*.js', { cwd: __dirname }))

app.listen(app.get("port"), () => {
  if (!config.isProduction) {
    const route = () => `http://localhost:${config.PORT}`;
    console.log(`Hello, your app is ready on ${route()}`);
    console.log('To shut it down, press <CTRL> + C at any time.');
    console.log('-------------------------------------------------------');
    console.log(`Environment  : ${config.NODE_ENV}`);
    console.log(`Version      : ${pkg.version}`);
    console.log(`API Info     : ${route()}`);
    console.log('-------------------------------------------------------');
  } else {
    console.log(`${pkg.name} is up and running.`);
  }
})

// middlewares for error
app.use((error, req, res, next) => {
  const code = error.message.startsWith("PM-") ? error.message : null;
  
  let messageError = code ? dictMessage[code] ?? dictMessage["PM-000-E"] : error.message;
  const msjParams = error.msjParams;
  if (msjParams && msjParams.length > 0) messageError = Utils.stringFormat(messageError, msjParams);
  
  res.status(error.status || 500);
  if (code) {
    console.error(`[ERROR ==> code:${code}, message:${messageError}`);
    res.json({
      error: 'true',
      status:error.status,
      code,
      message: messageError,
      data:null
    })
  } else {
    console.error(`[ERROR ==> ${JSON.stringify(error)}`);
    res.json({
      error: 'true',
      status:error.status,
      error: messageError,
      data:null
    })
  }
})


function toFwSlash(path) {
  return path.replace(/\\/g, '/');
}
