const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const animationRoutes = require('./routes/animationRoutes');
const usersRoutes = require('./routes/usersRoutes');

const app = express();

app.use(express.json({ extended: true }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/animation', animationRoutes);
app.use('/users', usersRoutes);

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    app.listen(config.get('port'), () => {
      console.log('server started...')
    })
  } catch (e) {
    console.log(e);
  }
}
start();