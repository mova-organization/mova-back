const express = require('express');
const YAML = require('yamljs');
const path = require('path');
const cors = require('cors');

const swaggerUI = require('swagger-ui-express');

const { errorLoggerMiddleware } = require('./middlewares/loggerMiddleware');
const { errorMiddleware } = require('./middlewares/errorMiddleware');

const userRouter = require('./resources/user/user.router');
const profileRouter = require('./resources/profile/profile.router');
const wordRouter = require('./resources/word/word.router');

const app = express();

const whitelist = [

  'http://localhost:3000',
  'http://0.0.0.0:3000',
  'http://localhost:4400',
  'http://0.0.0.0:4400',
  'https://movafront.netlify.app/',
  'https://mova-gh.netlify.app/',
  'http://localhost:5000',
  'http://0.0.0.0:5000',
  'http://127.0.0.1:5000/'
];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credential: true
}
app.options('*', cors(corsOptions))

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
// app.use((req, res, next) => {
//   res.locals.env = process.env;
//   next();
// });
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/api/test', (req, res, next) => {
  if (req.method === 'GET') {
    res.status(200).json({ message: "It's Alive!" });
    return;
  }
  next();
});

app.use('/api', userRouter);
app.use('/api/profiles', profileRouter);
app.use('/api/dictionary', wordRouter);
app.use(errorMiddleware);
app.use(errorLoggerMiddleware);

module.exports = app;
