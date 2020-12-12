const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const Redistore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const handlebars = require('express-handlebars');
const handlebarsHelpers = require('handlebars-helpers')();
const { redisClient } = require('./redis');
const routes = require('../routes');
const { secret, logs } = require('./vars');

const app = express();

// set sessions settings
app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false,
    store: new Redistore({ client: redisClient }),
  })
);

// set flash messages
app.use(flash());

// override with POST having ?_method=XXX
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// request logging. dev: console | production: file
app.use(morgan(logs));

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        fontSrc: ["'self'", 'cdnjs.cloudflare.com'],
        scriptSrc: ["'self'", 'code.jquery.com', 'cdn.jsdelivr.net'],
        imgSrc: ["'self'", 'data:'],
        objectSrc: ["'none'"],
        styleSrc: ["'self'", 'cdn.jsdelivr.net', 'cdnjs.cloudflare.com'],
        upgradeInsecureRequests: [],
      },
    },
  })
);

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable handlebars template engine
app.set('views', 'src/views');
app.engine(
  '.hbs',
  handlebars({
    extname: '.hbs',
    helpers: {
      route: (routeName, ...args) => {
        const param = args[0].hash.id !== undefined ? args[0].hash.id : null;
        if (param) {
          return `${process.env.APP_HOST}:${process.env.APP_PORT}/${routeName}/${param}`;
        }
        return `${process.env.APP_HOST}:${process.env.APP_PORT}/${routeName}`;
      },
      handlebars: handlebarsHelpers,
    },
    runtimeOptions: {
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true,
    },
  })
);
app.set('view engine', '.hbs');

// mount routes
app.use('/', routes);

module.exports = app;
