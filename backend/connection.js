const mongoose = require('mongoose');

const url ='mongodb+srv://harshittrivedi22022001:6387040963@cluster0.uh3lgry.mongodb.net/mydatabase?retryWrites=true&w=majority';

mongoose.connect(url)
.then((result) => {
    // console.log()
   console.log('database conected'); 
})
.catch((err) => {
    console.error(err);
    
});

module.exports = mongoose;