let mongoose = require('mongoose');

const server = '192.168.1.12';
const database = 'padscape';

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose.connect(`mongodb://${server}/${database}`, {useNewUrlParser: true})
      .then(() => {
        console.log('Database connection successful');
      })
      .catch(err => {
        console.error(`Database connection error: ${err}`);
      })
  }
}

var db = new Database();
