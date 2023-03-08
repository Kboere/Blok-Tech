require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const port = 3000

// Connecting mongoDB
const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
const dbName = 'test'

// collections aanroepen
const db = client.db(dbName)
const colf = db.collection('form')
const cole = db.collection('events')

// set the view engine to ejs
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/static')))

// index page
app.get('/', function (req, res) {
  res.render('pages/index')
})

// zoekresultaten page
// app.get('/zoekresultaat', async (req, res) => {
//   try {
//     await client.connect()
//     console.log('Connected correctly to server')

//     const data = await cole.find()
//     // console.log(data)
//     // iterate code goes here
//     await data.forEach(console.log)

//     // res.render('pages/zoekresultaat', { data })
//   } catch (err) {
//     console.log(err.stack)
//   }
// })

app.post('/zoekresultaat', async (req, res) => {
  try {
    await client.connect()
    // console.log('Connected correctly to server')

    // Construct a document
    const personDocument = {
      AntwoordVraag1: req.body.vraag1,
      AntwoordVraag2: parseInt(req.body.vraag2),
      AntwoordVraag3: req.body.vraag3,
      AntwoordVraag4: req.body.vraag4
    }
    // Insert a single document, wait for promise so we can read it back
    await colf.insertOne(personDocument)

    const data = await cole.findOne({ locatie: 'Europaplein 24, 1078 GZ Amsterdam', reistijd: { $gt: 50 }, datum: '23 maart 2023', tijd: '14:00 tot 18:00', foto: '../img/jdmcar.png', soort: 'JDM cars', grootte: { $gt: 60 }, eventnaam: { $ne: 'cars' } })
    res.render('pages/zoekresultaat', { data })

    console.log(personDocument)
  } catch (err) {
    console.log(err.stack)
  } finally {
    await client.close()
  }
})

// app.post('/aanmelden', async (req, res) => {
//   try {
//     await client.connect()

//     await cole.findOneAndUpdate({ grootte: { $inc: 1 } })
//     const data = await cole.findOne({ grootte: '' })
//     res.render('pages/zoekresultaat', { data })
//   } catch (err) {
//     console.log(err.stack)
//   } finally {
//     await client.close()
//   }
// })

app.use(function (req, res, next) {
  res.status(404).render('pages/404page')
})

// Altijd onderaan zetten
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
