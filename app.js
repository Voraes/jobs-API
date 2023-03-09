require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
//Error handling
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
//ConnectDB
const connectDB = require('./db/connect');
//Router
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

app.use(express.json());

// extra packages

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.port || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port);
  } catch (error) {
    console.log(error);
  }
};

start();
