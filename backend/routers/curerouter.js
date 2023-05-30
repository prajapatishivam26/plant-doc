const Model = require('../models/cureModel');
const { Router } = require('express');
const router = Router();

// add user data
router.post('/add', (req, res) => {
    console.log(req.body);
    // res.send('Response from User Router');

    new Model(req.body).save()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });

});

router.get('/getall', (req, res) => {
    Model.find({})
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.get('/getbyuser/:id', (req, res) => {
    Model.find({user : req.params.id})
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.get('/getbyid/:id', (req, res) => {
    console.log(req.params.id);
    Model.findById(req.params.id)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});
router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
    .then((result) => {
        if(result) res.json(result);
        else res.status(401).json({ message: 'Invalid Credentials'});

    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
        

    });
})


module.exports = router;