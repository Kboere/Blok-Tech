/* eslint-disable no-trailing-spaces */
require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const port = 3000

// uploads images into database
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/events/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })

// Connecting mongoDB
const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
const dbName = 'test'
client.connect()

// collections aanroepen
const db = client.db(dbName)
const colf = db.collection('form')
const cole = db.collection('events')

// set the view engine to ejs
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/static')))

// index page
app.get('/index', function (req, res) {
  res.render('pages/index')
})

// event add page
app.get('/eventadd', function (req, res) {
  res.render('pages/eventadd')
})

// adds a event to collection "events"
app.post('/succes', upload.single('uploaded'), async (req, res, next) => {
  try {
    // Construct a document
    const addevents = {
      eventnaam: req.body.naam,
      datum: req.body.datum,
      tijd: req.body.tijden,
      foto: req.file.path,
      grootte: parseInt(req.body.grootte),
      reistijd: parseInt(req.body.reistijd),
      soort: req.body.soort,
      locatie: req.body.locatie
    }
    console.log(addevents.foto)
    // Insert a single document, wait for promise so we can read it back
    await cole.insertOne(addevents)
    res.render('pages/succes')
  } catch (err) {
    console.log(err.stack)
  }
})

// zoekresultaten page
app.post('/zoekresultaat', async (req, res) => {
  try {
    // Construct a document
    const personDocument = {
      AntwoordVraag1: req.body.soort,
      AntwoordVraag2: parseInt(req.body.grootte),
      AntwoordVraag3: parseInt(req.body.reistijd)
    }

    // Insert a single document, wait for promise so we can read it back
    await colf.insertOne(personDocument)

    // fetch current weather from API
    const response = await fetch('http://api.weatherapi.com/v1/ip.json?key=270ff04d6ed642ac97a112730231003&q=auto:ip')
    const weatherData = await response.json()

    // checks if all elements compare to a event
    const data = await cole.find(
      { 
        $and: [
          { reistijd: { $not: { $gte: parseInt(req.body.reistijd) } } }, 
          { grootte: { $not: { $gte: parseInt(req.body.grootte) } } }, 
          { soort: req.body.soort }
        ] 
      }).toArray()

    const countEvents = await cole.countDocuments(
      { 
        $and: [
          { reistijd: { $not: { $gte: parseInt(req.body.reistijd) } } }, 
          { grootte: { $not: { $gte: parseInt(req.body.grootte) } } }, 
          { soort: req.body.soort }
        ] 
      }
    )
    console.log(`Number of documents in the events collection: ${countEvents}`)
  
    if (data) {
      res.render('pages/zoekresultaat', { data, weatherData, countEvents })
    } else {
      res.send('no results')
    }
  } catch (err) {
    console.log(err.stack)
  }
})

// when no url gets recognized a 404 page shows up
app.use(function (req, res, next) {
  res.status(404).render('pages/404page')
})

// Always on the bottom
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
