const express=require('express');
const cors=require('cors')
const app=express();
const port=5000;
const mongoDB=require("./db")

mongoDB();
app.use(cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Hello World');
})


app.use('/api',require("./Routes/CreateUser.js"));
app.use('/api',require("./Routes/DisplayData.js"));


app.listen(port,()=>{
    console.log(`Server Started on ${port}`);
})