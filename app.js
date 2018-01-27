var express = require("express");
var http = require("http");
var path = require("path");
var morgan = require('morgan')
var favicon = require('serve-favicon')
var bodyParser = require('body-parser')
var errorhandler = require('errorhandler')

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var route = require("./routes");
var admin = require("./routes/admin");
var user = require("./routes/user");
var app= express();
var port= 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine',  'ejs');
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// development only 
if (process.env.NODE_ENV === 'development') {
  // only use in development 
  app.use(errorhandler())
}

var mongoose = require('mongoose');
mongoose.connect('mongodb://pama:moronkeji@ds151820.mlab.com:51820/quizapp');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function callback(){
   console.log("db now connected");
});

app.get("/", route.index);
app.post('/register',route.regUser);
app.post('/login',route.studentLogin);
app.post('/addqname',route.addQname);
app.post('/support',route.support);
app.post('/checkqname',route.checkQname);
app.post('/load',route.loadQuestion);
app.post('/saveResult',route.saveResult);
app.post('/showResult',route.showResult);
app.post('/getUserInfo',route.getUserInfo);
app.post('/addquestion',route.addQuestion);
app.post('/adminLogin',admin.adminLogin);
app.post('/registerAdmin',admin.regAdmin);
app.post('/findAllUser',user.findAllUser);
app.post('/findUser',user.findUser);
app.post('/updateUser',user.updateUser);
app.post('/deleteUser',user.deleteUser);
app.post('/getQuestionType',route.getQuestionType);
app.post('/adminList',admin.adminList);

// app.post('/takeTest',route.takeTest);

var storage = multer.diskStorage({ //multers disk storage settings
	destination: function (req, file, cb) {
	    cb(null, './uploads/')
	},
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
    });
    var upload = multer({ //multer settings
        storage: storage
    }).single('file');
    /** API path that will upload the files */
    app.post('/upload', function(req, res) {
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json({error_code:0,err_desc:null});
    })
    });



app.listen(port, function () {
  console.log('App is listening on ' + port)
})