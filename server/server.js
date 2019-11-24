const path = require('path');
const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
const mongoFunctions = require('./controllers/mongoController');

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('\n\nSOCKET ID: ', socket.id);
  socket.on('newQuestion', (question, answer) => {
    console.log('server received new question', question, answer);
    io.sockets.emit('newQuestion', question, answer);
  });

  socket.on('clickedLetter', (letter) => {
    console.log('server recived', letter);
    io.sockets.emit('clickedLetter', letter);
  });
});


app.use(bodyParser.json());

// For Build
// For adding a new remote to heroku : heroku git:remote -a hangmanx-cs
// push the branch adam-rajeeb/heroku-deployment to heroku remote's master
// branch : git push heroku adam-rajeeb/heroku-deployment:master
app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

app.get('/newPrompt', mongoFunctions.getNewQandA, (req, res) => {
  // console.log('new question at the end of new prompt endpoint', res.locals.newQuestion);
  res.status(300).json(res.locals.newQuestion);
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

/**
 * @name GLOBAL ROUTE HANDLER
 * @description handles all bad request sent from frontend
 */
app.all('*', (req, res) => {
  res.status(404).send('Page not found');
});

/**
 * @name : GLOBAL ERROR HANDLER
 * @description sending error objects from controllers/routes should be sent as an object with
 * 'status' and 'message' as key.
 * Status value should be a status code & message value should be a string describing the error
 * and location/file in which the error was invoked from
 */
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Error caught by Global Error Handler',
    message: 'Unknown Middleware Error occured',
    status: 500,
  };
  const newError = { ...defaultError, ...err };
  console.log('*********** ERROR **********\n', newError.log);
  res.status(newError.status).send(newError.message);
});

server.listen(PORT, () => console.log('Server listening on PORT:', PORT));
