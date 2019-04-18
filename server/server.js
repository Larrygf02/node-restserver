require('./config/config')


const express = require('express')
const mongoose = require('mongoose')


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

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    }else {
        res.json({
            body
        })
    }
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

mongoose.connect('mongodb://localhost:27017/cafe', (err, resp) => {
    if ( err ) throw err;
    console.log('Base de datos conectada');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto 3000');
})