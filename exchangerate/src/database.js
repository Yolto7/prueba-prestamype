const mongoose = require('mongoose');
const config = require('./config');

const MONGO_URI = config.MONGODB_URI;

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
};

mongoose.connect(MONGO_URI, connectOptions)
    .then(db => console.log('Db ExchageRate is connected'))
    .catch(error => console.error(error));