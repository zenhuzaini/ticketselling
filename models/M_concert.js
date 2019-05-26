const mongoose = require('mongoose');

const ConcertSchema = mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    description: String,
    date: String,
    time: String,
    price: String,
    location: String,
    ticket: {
        type: Number
    }
});

module.exports = mongoose.model('Concert', ConcertSchema);

