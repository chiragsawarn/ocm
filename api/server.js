require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
app.use(cors());

// arg is string that is our db connection, pulled from .env
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))
app.use(express.json())

// const patientAuthRouter = require('./routes/patientAuth')
// app.use('/patientAuth', patientAuthRouter)
const providerAuthRouter = require('./routes/providerAuth')
app.use('/providerAuth', providerAuthRouter)

app.listen(3000, () => console.log('Server Started!'));