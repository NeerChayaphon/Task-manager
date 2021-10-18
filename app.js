const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

// middleware

app.use(express.json());

// route
app.get('/hello', (req, res) => {
  res.send('Task manger app');
});
app.use('/api/v1/tasks', tasks);


const port = 3000;

const start = async () => {
  try {
    const conn = await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

start();
