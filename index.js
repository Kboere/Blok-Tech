require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const port = 3000

// Connecting mongoDB
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
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

app.post('/zoekresultaat', async (req, res) => {
  try {
    await client.connect()
    // console.log('Connected correctly to server')

    // Construct a document
    const personDocument = {
      AntwoordVraag1: req.body.vraag1,
      AntwoordVraag2: parseInt(req.body.vraag2),
      AntwoordVraag3: parseInt(req.body.vraag3),
      AntwoordVraag4: req.body.vraag4
    }
    // Insert a single document, wait for promise so we can read it back
    await colf.insertOne(personDocument)

    // checkt of er op z'n minst 1 van de twee voldoen en laadt die dan zien
    const data = await cole.find({ $and: [{ reistijd: { $not: { $gte: parseInt(req.body.vraag3) } } }, { grootte: { $not: { $gte: parseInt(req.body.vraag2) } } }, { soort: req.body.vraag1 }] }).toArray()
    console.log(data)
    if (data) {
      res.render('pages/zoekresultaat', { data })
    } else {
      res.send('no results')
    }

    console.log(personDocument)
  } catch (err) {
    console.log(err.stack)
  }
})

app.post('/aanmelden', async (req, res) => {
  try {
    await client.connect()

    await cole.updateOne({ _id: new ObjectId(req.body._id) }, { $inc: { grootte: 1 } })
    const data = await cole.findOne({ _id: new ObjectId(req.body._id) })
    res.render('pages/aanmelden', { data })

    console.log(data)
  } catch (err) {
    console.log(err.stack)
  }
})

app.use(function (req, res, next) {
  res.status(404).render('pages/404page')
})

// Altijd onderaan zetten
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
