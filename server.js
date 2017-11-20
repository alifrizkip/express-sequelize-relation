const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
// const db = require('./models');

const app = express();

const usersRoute = require('./routes/usersRoute');
const groupsRoute = require('./routes/groupsRoute');
const postsRoute = require('./routes/postsRoute');
const addressRoute = require('./routes/addressRoute');
const authRoute = require('./routes/authRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', usersRoute);
app.use('/api/groups', groupsRoute);
app.use('/api', postsRoute);
app.use('/api', addressRoute);
app.use('/api', authRoute);

app.listen(3000, () => {
  console.log('Running port 3000');
  // db.sequelize.sync();
});
