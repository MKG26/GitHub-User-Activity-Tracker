const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const PORT = 3000


const app = express()

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))
app.use('/api',require('./routes/listEventsRouter.js'))
app.listen(PORT,()=>{
    console.log('App is listening on port ')
})

