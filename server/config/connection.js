const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://s10skeleton:Goesboom1!@cluster0.jmtowpx.mongodb.net/googlebooks');

module.exports = mongoose.connection;
