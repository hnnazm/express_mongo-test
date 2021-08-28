const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const Note = require('./models/note')

const MONGO_URI = 'mongodb://mongo:27017/note'
const PORT = 3000

const app = express()
const server = http.createServer(app)

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res, next) => {
   const records = await Note.find()
   for (const record of records) {
      console.log(record)
   }

   res.json({
      status: 'Okay',
      data: records
   })
})

app.post('/create', async (req, res, next) => {
   const record = req.body
   console.log(record)

   const response = await Note.create(record)
   console.log(response)

   res.json({
      status: 'Created!',
      data: record
   })
})

server.listen(PORT, () => console.log(`Server running on ${PORT}`))
