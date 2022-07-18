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

const patientAuthRouter = require('./routes/patientAuth')
app.use('/patientAuth', patientAuthRouter)

const providerAuthRouter = require('./routes/providerAuth')
app.use('/providerAuth', providerAuthRouter)

const networkRouter = require('./routes/network')
app.use('/network', networkRouter)

const patientRouter = require('./routes/patient')
app.use('/patient', patientRouter)

const encounterRouter = require('./routes/encounter')
app.use('/encounter', encounterRouter)

app.listen(3000, () => console.log('Server Started!'));