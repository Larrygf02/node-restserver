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
    Usuario.find({estado: true}, 'nombre email role estado google')
            .skip(desde)
            .limit(limite)
            .exec( (err, usuarios) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                };

                Usuario.count({estado: true}, (err, conteo) => {
                    res.json({
                        ok: true,
                        usuarios,
                        cuantos: conteo
                    })
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

//parametro id
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    //Usuario.findByIdAndRemove(id, (err, usuario) => {
    let cambiaEstado = {
        estado: false
    };
    Usuario.findOneAndUpdate(id, cambiaEstado, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (usuario === null) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'El usuario no fue encontrado'
                }
            });
        }
        res.json({
            ok: true,
            usuario
        })
    });
})

module.exports = app;