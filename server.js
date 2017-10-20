var express = require('express');
var app = express();
var port = 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('pages/index');
});

app.listen(port, function(){
  console.log("listening on port: " + port);
})
