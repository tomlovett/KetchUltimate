// Requires \\
var express    = require('express'),
    bodyParser = require('body-parser'),
    logger     = require('morgan'),
    mongoose   = require('mongoose'),
    controller = require('./controller/controller.js')

// Create Express App Object \\
var app = express();

// Application Configuration \\
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/Public'));
// mongoose.connect('mongodb://localhost/quizzes')


// Routes \\
// app.get('/', function(req, res) {
//   res.sendFile('index.html', {root: './public/html'})
// })

// app.get('/quiz', function(req, res) {
// 	res.sendFile('quiz.html', {root: './public/html'})
// })

// API \\
// app.post('/api/translate', controller.apiTranslate)
// app.post('/api/loadNext',  controller.nextQuestion)


// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})