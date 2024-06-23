const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;

var indexRouter = require('./routes/index');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexRouter);

app.listen(PORT, () => {
  console.log(`Server exprese API is running on port ${PORT}`);
})
