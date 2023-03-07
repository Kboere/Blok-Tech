require('dotenv').config()
const { MongoClient } = require('mongodb')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)
const dbName = 'test' 
const db = client.db(dbName)

// ik zou hier bij zetten wat dit doet
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/static'))

// set the view engine to ejs
app.set('view engine', 'ejs')

// use res.render to load up an ejs view file
// index page
app.get('/', function(req, res) {
  res.render('pages/index')
})

const posts = [
  {title: 'Title 1', body: 'Body 1' },
  {title: 'Title 2', body: 'Body 2' },
  {title: 'Title 3', body: 'Body 3' },
  {title: 'Title 4', body: 'Body 4' },
]
const user = {
  firstName: 'Tim',
  lastName: 'Cook',
}

// zoekresultaten page
app.get('/zoekresultaat', function(req, res) {
  res.render('pages/zoekresultaat')

  async function run() {
    try {
         await client.connect() 
         console.log('Connected correctly to server') 
         const db = client.db(dbName) 
         // Use the collection'events'
         const col = db.collection('events') 

         const cursor = col.find()
         // print a message if no documents were found
         if ((await col.countDocuments()) === 0) {
           console.log("No documents found!")
         }
         // replace console.dir with your callback to access individual elements
         await cursor.forEach(console.dir)
       } finally {
         await client.close();
       }
}
run().catch(console.dir)

})

// de console.log en async function zitten niet op dezelfde tab en dat is niet netjes
// ook wordt de functie best wel lang en onleesbaar zo
// want runt de functie 
app.post('/zoekresultaat', (req, res) => {
  console.log(req.body)
    
 async function run() {
    try {
         await client.connect() 
         console.log('Connected correctly to server') 
         const db = client.db(dbName) 
         // Use the collection'form'
         const col = db.collection('form') 

        // Construct a document                                                                                                                                                              
        let personDocument = {
         'Antwoord op vraag 1': req.body.vraag1,
         'Antwoord op vraag 2': req.body.vraag2,
         'Antwoord op vraag 3': req.body.vraag3,
         'Antwoord op vraag 4': req.body.vraag4,
         'extra aanvulling van vraag 4': req.body.recommend
        }
      // Insert a single document, wait for promise so we can read it back
      const p = await col.insertOne(personDocument) 

        } catch (err) {
         console.log(err.stack) 
     }
 
     finally {
        await client.close() 
    }
}
run().catch(console.dir) 
res.render('pages/zoekresultaat')
}) 
app.use(function (req, res, next) {
  // YOU CAN CREATE A CUSTOM EJS FILE TO SHOW CUSTOM ERROR MESSAGE
    res.status(404).render('pages/404page')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})