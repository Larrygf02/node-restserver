const express = require('express')

const { verificaToken } = require('../middlewares/autenticacion')

let app = express();
let Producto = require('../models/producto')

// Obtener todos los productos
app.get('/productos', (req, res) => {
    //trae todos los productos
    //populates usuario, categoria
    //paginado

})

app.get('/producto/:id', (req, res) => {
    //obtener un producto solo por id
} )

app.post('/producto', verificaToken, (req, res) => {
    //grabar el usuario y una categoria
    let body = req.body;
    console.log(body);
    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    })

    producto.save((err, productoDB) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });
    })
})

app.put('/producto/:id', (req, res) => {
    //actualizar producto
})


app.delete('/producto/:id', (req, res) => {
    //disponible: False
})


module.exports = app;
