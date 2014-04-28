
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var students = require('./routes/students');
var http = require('http');
var path = require('path');
var reminder= require('./custom_modules/reminder');

reminder=new reminder;
reminder.startReminder();
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



/*  DATABASE HANDLING




 */




// Application initialization












app.get('/', routes.index);
app.get('/users', user.list);

app.get('/', function(req, res) {
    var dir = '\\public';
    console.log('[server] - request: ' + req.url);
    res.sendfile(__dirname + dir + req.url);
});



/// Custom
app.get('/students/id', students.getStudentsById);
app.get('/students/name', students.getStudentsByName);
app.get('/students/lastName', students.getStudentsByLastName);
app.get('/students/phone', students.getStudentsByPhone);
app.get('/students/tag', students.generalSearch);
app.get('/students', students.studentslist);
app.post('/students',students.addStudent);
app.put('/students',students.updateStudent);
app.delete('/students',students.deleteStudent);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
