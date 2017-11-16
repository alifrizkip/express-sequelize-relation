const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const usersRoute = require('./routes/usersRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', usersRoute);

app.listen(3000, () => {
  console.log('Running port 3000');
});
