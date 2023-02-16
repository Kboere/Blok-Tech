const express = require('express')
const app = express()
const port = 3000

app.use(express.static('static'))

app.get('/hallo', (req, res) => {
  res.send('<img src="/img/duck.jpeg" width="150px">Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/home/:user', (req, res) => {
    console.log(`input van ${req.params.user}`)
    res.send(`<img src="/img/duck.jpeg" width="150px"><h1>Hello `+ req.params.user + `</h1>`)
})