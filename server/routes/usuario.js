const express = require('express')
const app = express()

const bcrypt = require('bcrypt');

const _ = require('underscore');
const Usuario = require('../models/usuario')

app.get('/usuario', function(req, res) {
    //res.json('Get Usuario')
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
    Usuario.find({})
            .skip(desde)
            .limit(limite)
            .exec( (err, usuarios) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                };

                res.json({
                    ok: true,
                    usuarios
                })
            })
})

app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB  
        })

    });
})


app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    //pick es una funcion de underscore
    let body = _.pick(req.body, ['nombre','email','img','role','estado']);

    console.log(body);
    //run validators sirve para correr las validaciones cuando se ejecute el metodo
    Usuario.findOneAndUpdate(id, body, { runValidators: true},(err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

})

app.delete('/usuario', function(req, res) {
    res.json('Delete usuario')
})

module.exports = app;