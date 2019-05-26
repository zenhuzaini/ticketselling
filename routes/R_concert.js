const express = require('express');
const router = express.Router();
const model_concert = require('../models/M_concert');

//GET ALL THE CONCERT INFORMATION
router.get('/', async (req,res) => {
    try {
        const concert = await model_concert.find();
        // res.json(concert);
        res.render('tickets/home', {concert});
    } catch (err) {
        res.json({message: err});
    }

});

//SPECIFIC CONCERT INFORMATION//
//GET SPECIFIC CONCERT
router.get('/getconcert/:concertId', async (req, res) =>{
    console.log("got the id : "+req.params.concertId);
    try {
        const getOneConcert = await model_concert.findById(req.params.concertId);
        //res.json(getOneConcert);
        res.render('tickets/show_detailconcert', {getOneConcert});
    } catch (err) {
        res.json({message:err});  
    }
});

//GET ALL LISTS OF CONCERT
router.get('/lists', async (req, res) => {
    try {
        const allConcerts = await model_concert.find();
        res.render('tickets_crud/home_concert', {allConcerts});
    } catch (err) {
        res.json({message:err});
    }
    
});

//SAVE NEW INFORMATION
//SAVE CONCERT /ASYNC
router.post('/saveconcert', async (req, res) =>{
    const concert = new model_concert({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        price: req.body.price,
        ticket: req.body.ticket,
        location: req.body.location
    });
    
    try {
        const savedPost = await concert.save();
        // res.json(savedPost);
        res.redirect('lists');
    } catch (err) {
        res.json({message: err});
    }
});

//DELETE CONCERT USING DELETE METHOD /ASYNC
router.delete('/delete/:concertId', async (req, res) => {
    console.log("got the id and will delete : "+req.params.concertId);
    try {
        const removeConcert = await model_concert.deleteOne({ _id: req.params.concertId });
        res.json(removeConcert);
    } catch (err) {
        res.json({message:err});
    }
});

//DELETE USING MEHOD GET /ASYNC
router.get('/delete/:concertId', async (req, res) => {
    console.log("got the id and will delete : "+req.params.concertId);
    try {
        const removeConcert = await model_concert.deleteOne({ _id: req.params.concertId });
        // res.json(removeConcert);
        res.redirect('/concert/lists');
    } catch (err) {
        res.json({message:err});
    }
});

//GET DETAILS FOR UPDATE /ASYNC
router.get('/update/:concertId', async (req, res) =>{
    console.log("got the id : "+req.params.concertId);
    try {
        const allConcerts = await model_concert.find();
        const getOneConcert = await model_concert.findById(req.params.concertId);
        //res.json(getOneConcert);
        res.render('tickets_crud/update_form', {getOneConcert, allConcerts});
        console.log(getOneConcert);
    } catch (err) {
        res.json({message:err});  
    }
});

//UPDATE CONCERT USING PATCH METHOD /ASYNC
router.patch('/update/:concertId', async (req, res) =>{
    try {
        const updateCOncert = await model_concert.updateOne(
            { _id : req.params.concertId},
            { $set: { title: req.body.title}}
        );
        res.json(updateCOncert);
    } catch (err) {
        res.json({message: err});
    }
});

//UPDATE CONCERT USING POST METHOD /ASYNC
router.post('/update/:concertId', async (req, res) =>{
    try {
        const updateCOncert = await model_concert.updateOne(
            { _id : req.params.concertId},
            { $set: { title: req.body.title,
                date: req.body.date,
                time: req.body.time,
                location: req.body.location,
                price: req.body.price,
                ticket: req.body.ticket,
                description: req.body.description
            }}
        );
        // res.json(updateCOncert);
        res.redirect('/concert/lists');
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router; //to export all the routers