const express = require('express')
const app = express()

app.get('/', function(req, res) {
    res.json('Hola mundo')
})

app.listen(3000, () => {
    console.log('Escuchando el puerto 3000');
})