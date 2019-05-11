const express = require('express')

const fs = require('fs')
const path = require('path')

let app = express()

app.get('/imagen/:tipo/:img', (req, res) => {
    let tipo = req.params.tipo
    let img = req.params.img

    let pathImg = `./uploads/${ tipo }/${ img }`;
    let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg')
    //verificar si el path existe
    //SendFile debe recibir un path absoluto
    res.sendFile(noImagePath)
})

module.exports = app;