const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://admin:denise1@cluster0.45k7rwa.mongodb.net/aroundb?appName=Cluster0');

app.use(cors());
app.options('*', cors());

app.use(express.json());

app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT);