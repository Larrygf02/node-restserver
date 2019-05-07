const express = require('express')

const { verificaToken } = require('../middlewares/autenticacion')

let app = express();
const _ = require('underscore');
let Producto = require('../models/producto')

// Obtener todos los productos
app.get('/productos', (req, res) => {
    //trae todos los productos
    //populates usuario, categoria
    //paginado
    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({ disponible: true })
            .skip(desde)
            .limit(5)
            .populate('usuario', 'nombre email')
            .populate('categoria', 'descripcion')
            .exec((err, productos) => {
                if(err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                res.json({
                    ok: true,
                    productos
                })
            })
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

app.put('/producto/:id', verificaToken, (req, res) => {
    //actualizar producto
    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'EL id no existe'
                }
            })
        }
    })
    body = _.pick(req.body, ['nombre', 'precioUni', 'categoria', 'disponible', 'descripcion']);
    Producto.findOneAndUpdate(id, body, {runValidators: true}, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            categoria: productoDB  
        })
    }) 
})


app.delete('/producto/:id', (req, res) => {
    //disponible: False

})


module.exports = app;
