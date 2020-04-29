const mongoose = require('mongoose');

mongoose
  .connect('mongodb://minimaless123:minimaless123@ds211648.mlab.com:11648/minimaless', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(x => console.log(`Connected to MongoDB! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to MongoDB', err));
