/*
 * Pull in Metalsmith and necessary plugins.
 */
var metalsmith = require('metalsmith'),
    layouts = require('metalsmith-layouts'),
    markdown = require('metalsmith-markdownit'),
    sass = require('metalsmith-sass');
var relativeLinks = require("metalsmith-relative-links");
var rootPath = require('metalsmith-rootpath');
var ancestry = require("metalsmith-ancestry");
var assets = require('metalsmith-assets');
var watch = require('metalsmith-watch');
var browserSync = require('metalsmith-browser-sync');


/*
 * Start the metalsmith build pipeline.  Give it the current directory to work with.
 */
var app = metalsmith(__dirname + '/../')

app
  .metadata({
    site: {
      title: 'Accessibility Developer Guide'
    }
  })
  .source('src')
  .destination('build')
  .use(assets({
    source: './assets', // relative to the working directory
    destination: './assets' // relative to the build directory
  }))
  .use(rootPath())
  .use(relativeLinks())
  .use(sass({
    outputDir: 'assets/css',
    outputStyle: 'expanded'
  }))
  .use(markdown('commonmark', {
    html: true
  }))
  .use(ancestry())
  .use(layouts({
    engine: 'handlebars',
    directory: 'layouts',
    partials: 'partials',
    pretty: true
  }))

  .build(function(err, files) {
    if (err) { throw err; }
    console.log('Build complete.');
  })

  if (process.env.SERVE) {
    app
      // .use(watch({
      //     livereload: false
      // }))
      .use(browserSync({
        server : "build",
        files: ['src/**/*', 'layouts/**/*'],
        logLevel: 'debug',
        port: 8080
      }))
  }

