const mongoose = require('mongoose');

const url ='mongodb+srv://ourplantdoc:1234@cluster0.xqh699r.mongodb.net/plantdoc?retryWrites=true&w=majority';

mongoose.connect(url)
.then((result) => {
   console.log('database conected'); 
})
.catch((err) => {
    console.error(err);
});

module.exports = mongoose;