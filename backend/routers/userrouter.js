const Model = require('../models/usermodel');
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

router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((result) => {
        if(result) res.json({result, message: 'User Updated Successfully'});
        else res.status(401).json({ message: 'Invalid Credentials'});

    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
        

    });
})


module.exports = router;