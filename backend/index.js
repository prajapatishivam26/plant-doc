const express = require('express');
const app = express();

// importing routers
const userRouter = require('./routers/userrouter');
const carRouter = require('./routers/carrouter');
const cors = require('cors');

app.use(cors({
    origin: ['http://localhost:3000']
}));

// parse json data
app.use(express.json());

// adding routers
app.use('/user',userRouter);
app.use('/car',carRouter);

const port = 5000;

app.get('/',(req , res) => {
    res.send('working refectly');
});

app.get('/add',(req,res)=>{
    res.send('response from add');
});

app.get('/getall',(req,res)=>{
    res.send('hello')
});

app.listen(port,() => {console.log('server started!!'); } );