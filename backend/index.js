const express = require('express');
const app = express();
//importing router
const userRouter = require('./routers/userrouter');
const imageRouter = require('./routers/imagerouter');
const predictionRouter = require('./routers/predictionrouter');
const utilRouter = require('./routers/util');
const cors = require('cors');

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}))
// parse json data
app.use(express.json());
// adding routers
app.use('/user',userRouter);

const port = 5000;

app.get('/', (req, res) => {
    res.send('Working Perfectly')
});

app.get('/add',(req, res) => {
    res.send('Response from Add');
})

// getall
app.get('/getall',(req,res) => {
    res.send('Hello')
})

app.listen(port, () => { console.log('server started!!'); } );