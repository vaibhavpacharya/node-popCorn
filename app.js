const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');
const minifyHTML = require('express-minify-html');

app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.set('views', `${__dirname}/views`);
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// compress all responses
app.use(compression());

// express-minify-html
app.use(
  minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true,
    },
  })
);

// requiring routes
const indexRoutes = require('./routes/index');
const moviesRoutes = require('./routes/nowplaying');
const popularRoutes = require('./routes/popular');
const topratedRoutes = require('./routes/toprated');
const upcomingRoutes = require('./routes/upcoming');

app.use('/', indexRoutes);
app.use('/nowplaying', moviesRoutes);
app.use('/popular', popularRoutes);
app.use('/toprated', topratedRoutes);
app.use('/upcoming', upcomingRoutes);

app.listen(port, () => {
  console.log(`server running at ${port}`);
});

module.exports = app;
