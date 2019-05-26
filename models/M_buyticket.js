const mongoose = require('mongoose');

const Schema_buyTicket = mongoose.Schema({
    concertId: String,
    totalPayment: String,
    datePayment: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('BuyTicket', Schema_buyTicket);