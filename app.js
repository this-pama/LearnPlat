var express = require("express");
var http = require("http");
var path = require("path");
var morgan = require('morgan')
var favicon = require('serve-favicon')
var bodyParser = require('body-parser')
var errorhandler = require('errorhandler')

var route = require("./routes");
var admin = require("./routes/admin");
var app= express();
var port= 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine',  'ejs');
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// development only 
if (process.env.NODE_ENV === 'development') {
  // only use in development 
  app.use(errorhandler())
}

app.get("/", route.index);
app.post('/register',route.regUser);
app.post('/login',route.studentLogin);
app.post('/addqname',route.addQname);
app.post('/load',route.loadQuestion);
app.post('/getUserInfo',route.getUserInfo);
app.post('/addquestion',route.addQuestion);
app.post('/adminLogin',admin.adminLogin);
app.post('/registerAdmin',admin.regAdmin);

// app.post('/takeTest',route.takeTest);


app.listen(port, function () {
  console.log('App is listening on ' + port)
})