const express = require('express')
// const bodyParser = require('body-parser') is niet meer nodig
// const path = require('path')
const app = express()
const port = 3000



app.use(express.urlencoded({extended: true}))

// set the view engine to ejs
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/static'))

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index')
})

// zoekresultaten page
app.get('/zoekresultaat', function(req, res) {
  res.render('pages/zoekresultaat')
})

app.post("/zoekresultaat", (req, res) => {
  console.log(req.body)
  res.render("pages/zoekresultaat")

  // const { name, password } = req.body;

  // if (name === "admin" && password === "admin") {
  //   res.render("pages/succes", {
  //     username: name,
  //   });
  // } else {
  //   res.render("pages/failure");
  // }
});

app.use(function (req, res, next) {
  // YOU CAN CREATE A CUSTOM EJS FILE TO SHOW CUSTOM ERROR MESSAGE
    res.status(404).render('pages/404page')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})