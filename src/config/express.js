const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const handlebars = require('express-handlebars');
const { errorReporter } = require('express-youch');
const routes = require('../routes');
const { logs } = require('./vars');

const app = express();

// request logging. dev: console | production: file
app.use(morgan(logs));

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable handlebars template engine
app.set('views', 'src/views');
app.engine('.hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// enable beautiful HTML error reports
app.use(errorReporter());

// mount routes
app.use('/', routes);

module.exports = app;
