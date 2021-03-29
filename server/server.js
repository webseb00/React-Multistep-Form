const express = require('express');
const db = require('./db');
const userRouter = require('./routers/user.js');
const cors = require('cors');
const app = express();

const PORT = process.env.port || 5000;

app.use(express.json());
app.use(cors());
app.use(userRouter);

app.get('/',(req, res) => {
  res.send('This response comes from server.js');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});