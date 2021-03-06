require('./config/config')


const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use( require('./routes/index'))

app.use(express.static(path.resolve(__dirname, '../public')))


app.get('/', function(req, res) {
    res.json('Hola mundo')
})

mongoose.connect(process.env.URLDB, {
    useCreateIndex: true,
    useNewUrlParser: true
}, (err, resp) => {
    if ( err ) throw err;
    console.log('Base de datos conectada');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto 3000');
})