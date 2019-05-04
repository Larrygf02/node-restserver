const express = require('express')

let { verificaToken } = require('../middlewares/autenticacion');

let app = express()

let Categoria = require('../models/categoria')
const _ = require('underscore');
//Mostrar todas las categorias
app.get('/categoria',verificaToken, (req,res) => {
    Categoria.find( (err, categorias) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        Categoria.count((err, conteo) => {
            res.json({
                ok: true,
                categorias,
                cuantos:conteo
            })
        })
    })
});

//Mostrar una categoria por id
app.get('/categoria/:id', verificaToken,(req,res) => {
    let id = req.params.id;
    Categoria.findById( id, (err, categoria) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            categoria
        })
    })
});

//Crear nueva categoria
app.post('/categoria',verificaToken,(req,res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    })
    console.log(categoria);

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
});


//Actualizar categoria
app.put('/categoria/:id', verificaToken, (req,res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion']);
    Categoria.findOneAndUpdate(id, body, {runValidators: true}, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            categoria: categoriaDB  
        })
    }) 
});

//Borrar categoria
app.delete('/categoria/:id', (req,res) => {
    //Solo un administrador puede borrar categorias
});


module.exports = app;