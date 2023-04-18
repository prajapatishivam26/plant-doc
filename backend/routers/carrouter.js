const Model = require('../models/carmodel');
const {Router}= require('express');
const router = Router();

// add user data
router.post('/add',(req ,res)=>{
    console.log(req.body);
    res.send('car model');
});



module.exports = router;