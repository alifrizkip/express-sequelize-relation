const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

const app = express();

const usersRoute = require('./routes/usersRoute');
const groupsRoute = require('./routes/groupsRoute');
const postsRoute = require('./routes/postsRoute');
const addressRoute = require('./routes/addressRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', usersRoute);
app.use('/api/groups', groupsRoute);
app.use('/api', postsRoute);
app.use('/api', addressRoute);

app.listen(3000, () => {
  console.log('Running port 3000');
  // db.sequelize.sync();
});
