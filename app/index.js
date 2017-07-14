var express = require('express'),
      serveStatic = require('serve-static');

var app = express();

var port = process.env.PORT || 3003;

app.use(serveStatic('build'));

console.log(`Serving to http://localhost:${port}`)
app.listen(port);
