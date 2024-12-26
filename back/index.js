import express from 'express';
import dotenv from 'dotenv';
const app = express();
app.use(express)
dotenv.config()
const Port = process.env.PORT || 3000



app.listen(Port, ()=> {
    console.log(`Listening on ${Port}`)
});