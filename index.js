const express = require('express')
const bodyParser = require('body-parser')
const path = require("path")
const app = express()
const port = 3000

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://KevinBoere:K3v1n@701@cluster0.itavqik.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

app.use(bodyParser.urlencoded({ extended: false }))

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/static'))

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index')
})

// about page
app.get('/zoekresultaat', function(req, res) {
  res.render('pages/zoekresultaat')
})

app.post("/login", (req, res) => {
  const { name, password } = req.body;

  if (name === "admin" && password === "admin") {
    res.render("pages/succes", {
      username: name,
    });
  } else {
    res.render("pages/failure");
  }
});


app.use(function (req, res, next) {
  // YOU CAN CREATE A CUSTOM EJS FILE TO SHOW CUSTOM ERROR MESSAGE
    res.status(404).render('pages/404page')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})