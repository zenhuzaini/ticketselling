const express = require('express');
const router = express.Router();
const model_buyTicket = require('../models/M_buyticket');
const paymentgateway = require('../function/paymentgateway');
const model_concert = require('../models/M_concert');

router.get('/', async (req, res) => {
    res.send('we are in buy page');
}); 

//MAKE PAYMENT
router.post('/:concertId', async (req, res) => {
    const buyTicket = new model_buyTicket({
        concertId: req.params.concertId,
        totalPayment: req.body.price
    });
    const a = new paymentgateway;
    
    try {
        const savePayment = await buyTicket.save();
        const b = a.charge(req.body.price, 'sucess', 'EUR');
        //res.json(savePayment);
        console.log(b);
        
        //Update ticket availability
        const getConcert = await model_concert.findById(req.params.concertId);
        const updateCOncert = await model_concert.updateOne(
            { _id : req.params.concertId },
            { $set: { ticket : getConcert.ticket - 1}}
        );
        //res.json(updateCOncert);
        
        res.render('tickets/payment_sucessfull', {savePayment});
    } catch (err) {
        //TRY TO MAKE A RANDOM RESULT IF ERROR OCCURS
        const arr = Array('payment_error', 'card_error');
        var randomItem = arr[Math.floor(Math.random()*arr.length)];

        const b = a.charge(req.body.price, randomItem, 'EUR');
        res.json({ message: err });
        console.log(b + " ---- " + randomItem);
    }
});

module.exports = router;

