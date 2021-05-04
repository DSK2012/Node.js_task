const express = require('express');
const mongoose = require('mongoose')
const reports = require('./routes/reports')


const app = express()

app.use(express.json())

app.use('/reports',reports);


mongoose.connect('mongodb://localhost:27017/data',{useNewUrlParser: true,useUnifiedTopology: true})
	.then(() => console.log('connected to Mongodb'))
	.catch((err) => console.error('could not connect to mongodb',err))

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
	console.log(`server listening on port ${port}`);
});