const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then( db => console.log('DB is Connected'))
  .catch( err => console.log(err));

module.exports = mongoose;