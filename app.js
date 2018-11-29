const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const mongoose = require('mongoose');
//const io = require("socket.io").listen(Server);
mongoose.connect("mongodb://hola:hola1234@ds161901.mlab.com:61901/web", {useNewUrlParser: true});

const auth = require("./auth");
const middleware = require("./middleware");
const userSchema = require('./models/users');

const dashboardRouter = require("./routes/dashboard");
const publicRouter = require("./routes/public");
const usersRouter = require("./routes/users");
const userChat = require("./routes/chat");
const UserRoutes = require('./routes/UserRoute');

var port = 3000;
var http = require('http');


// App initialization
const app = express();
var server = http.createServer(app);
app.set(port);
server.listen(port);

const io = require("socket.io")(server);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware
// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: 'Atlf57Tj1BKhzexk0gsQj5YVr6hbuaEJ1MFgHVZYFxYHMJUjwXWvNP7AJo3z50aL',
  resave: true,
  saveUninitialized: false
}));

app.use(auth.oidc.router);
app.use(middleware.addUser);

io.on('connection', (socket)=>{
  console.log('usuario conectado');

  socket.on('disconnect', function () {
    console.log('usuario desconectado');
  });

  //usuario por defecto
	socket.username = "anonimo";

  socket.on('change_username', (data) => {
      socket.username = data.username;
  })

  socket.on('new_message', (data) => {
      io.sockets.emit('new_message', {message : data.message, username : socket.username});
  })

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', {username : socket.username});
  })

});

// Routes
app.use("/", publicRouter);
app.use("/dashboard", middleware.loginRequired, dashboardRouter, UserRoutes);
app.use("/users", usersRouter);
app.use('/chat', middleware.loginRequired, userChat, userSchema);

// Error handlers
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;