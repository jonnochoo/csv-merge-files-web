var express = require('express');
var path = require('path');
var routes = require('./routes');

var port = process.env.PORT || 3000;

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "jade");

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.use(function(req, res){
  res.status(404);
  res.render('404');
});

app.listen(port, function(){
  console.log('Express server listening on port ' + port);
});