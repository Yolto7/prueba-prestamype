// Imports modules
const express = require('express')
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('./config')

const pkg = require('../package.json');

// init
const app = express()

// Settings
app.set('pkg', pkg)
app.set("port", config.PORT);
app.set("json spaces", 4);

// Middlewares
const corsOptions = {
  // origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());


const pkgProject = app.get('pkg');

//Welcome Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to PrestaMype",
    name: pkgProject.name,
    version: pkgProject.version,
    description: pkgProject.description,
    author: pkgProject.author,
  });
});

module.exports = app;
