const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.json('Hola mundo')
})

app.get('/usuario', function(req, res) {
    res.json('Get Usuario')
})

app.post('/usuario', function(req, res) {
    let body = req.body;
    res.json({
        body
    })
})


app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id
    })
})

app.delete('/usuario', function(req, res) {
    res.json('Delete usuario')
})


app.listen(3000, () => {
    console.log('Escuchando el puerto 3000');
})