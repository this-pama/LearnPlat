var express = require("express");
var http = require("http");
var path = require("path");
var morgan = require('morgan')
// var favicon = require('serve-favicon')
var bodyParser = require('body-parser')
var errorhandler = require('errorhandler')
var WebSocket = require('ws');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var route = require("./routes");
var admin = require("./routes/admin");
var superAdmin = require("./routes/superadmin");
var user = require("./routes/user");
var config = require("./config");
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

config(app)

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
app.post('/registerSuperAdmin',superAdmin.regSuperAdmin);
app.post('/superAdminLogin',superAdmin.superAdminLogin);
app.post('/superAdminList',superAdmin.superAdminList);
app.post('/findAllUser',user.findAllUser);
app.post('/findUser',user.findUser);
app.post('/updateUser',user.updateUser);
app.post('/deleteUser',user.deleteUser);
app.post('/getQuestionType',route.getQuestionType);
app.post('/adminList',admin.adminList);
app.post('/findAdmin',admin.findAdmin);
app.post('/deleteAdmin',admin.deleteAdmin);
app.post('/deleteQtype',route.deleteQtype);
app.post('/updateAdmin',admin.updateAdmin);
app.post('/updateQtype',route.updateQtype);

// app.post('/takeTest',route.takeTest);

var storage = multer.diskStorage({ //multers disk storage settings
	destination: function (req, file, cb) {
	    cb(null, './public/uploads/')
	},
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
       cb(null, file.originalname )
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
         res.json({error_code:0,err_desc:null, newName:res.filename});
    })
    });




const server = http.createServer(app);
server.listen(port, function () {
  console.log('App is listening on ' + port)
})


var fs = require('fs'),
  http = require('http'),
  WebSocket = require('ws');

if (process.argv.length < 3) {
  console.log(
    'Usage: \n' +
    'node app.js <secret> [<stream-port> <websocket-port>]'
  );
  process.exit();
}

var STREAM_SECRET = process.argv[2],
  STREAM_PORT = process.argv[3] || 3004,
  WEBSOCKET_PORT = process.argv[4] || 3002,
  RECORD_STREAM = false;

// Websocket Server
var socketServer = new WebSocket.Server({port: WEBSOCKET_PORT, perMessageDeflate: false});
socketServer.connectionCount = 0;
socketServer.on('connection', function(socket, upgradeReq) {
  socketServer.connectionCount++;
  console.log(
    'New WebSocket Connection: ', 
    (upgradeReq || socket.upgradeReq).socket.remoteAddress,
    (upgradeReq || socket.upgradeReq).headers['user-agent'],
    '('+socketServer.connectionCount+' total)'
  );
  socket.on('close', function(code, message){
    socketServer.connectionCount--;
    console.log(
      'Disconnected WebSocket ('+socketServer.connectionCount+' total)'
    );
  });
});

//broadcast stream
socketServer.broadcast = function(data) {
  socketServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);}
    // }else{
    //   server.close(function(){
    //     console.log('client is not ready')
    //   })
    // }
  });
};

socketServer.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
  ws.on('error', () => console.log('errored'));
});


// HTTP Server to accept incomming MPEG-TS Stream from ffmpeg
var streamServer = http.createServer( function(request, response) {
  var params = request.url.substr(1).split('/');

  if (params[0] !== STREAM_SECRET) {
    console.log(
      'Failed Stream Connection: '+ request.socket.remoteAddress + ':' +
      request.socket.remotePort + ' - wrong secret.'
    );
    response.end();
  }

  response.connection.setTimeout(0);
  console.log(
    'Stream Connected: ' + 
    request.socket.remoteAddress + ':' +
    request.socket.remotePort
  );
  request.on('data', function(data){
    socketServer.broadcast(data);
    if (request.socket.recording) {
      request.socket.recording.write(data);
    }
  });
  request.on('end',function(){
    console.log('close');
    // socketServer.broadcast('The End. LearnPlat Going Offline')
    socketServer.close(function(){
      console.log("End of Streaming")
    })
    if (request.socket.recording) {
      request.socket.recording.close();
    }
  });

  // Record the stream to a local file?
  if (RECORD_STREAM) {
    var path = 'recordings/' + Date.now() + '.ts';
    request.socket.recording = fs.createWriteStream(path);
  }
}).listen(STREAM_PORT);

console.log('Listening for incomming MPEG-TS Stream on http://127.0.0.1:'+STREAM_PORT+'/<secret>');
console.log('Awaiting WebSocket connections on ws://127.0.0.1:'+WEBSOCKET_PORT+'/');



