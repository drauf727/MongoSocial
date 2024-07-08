const { connect, connection } = require('mongoose');

connect('mongodb://localhost:27017/MongoSocial')

module.exports = connection;