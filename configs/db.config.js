const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/minimaless', 
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(x => console.log(`Connected to MongoDB! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to MongoDB', err));
