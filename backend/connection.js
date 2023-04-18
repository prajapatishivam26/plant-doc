const mongoose = require('mongoose');
const url ='mongodb+srv://shivam:26022001@cluster0.uqakyi0.mongodb.net/mydatabase?retryWrites=true&w=majority';
mongoose.connect(url)
.then((result) => {
    console.log('database connected');
    
})
.catch((err) => {
    console.error(err);
    
});

module.exports = mongoose;

//  sychronous and asychronous