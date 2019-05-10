const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const Usuario = require('../models/usuario')
const fs = require('fs')
const path = require('path')


app.use(fileUpload());

app.put('/upload/:tipo/:id', function(req, res) {

    let tipo = req.params.tipo
    let id = req.params.id


    if(!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha selecciona algun archivo'
            }
        })
    }
    //Validar tipo
    let tiposValidos = ['productos','usuarios']
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos permitidos son '+ tiposValidos.join(', ')
            }
        })
    }

    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.')
    let extension = nombreCortado[nombreCortado.length-1]

    // Extensiones permitidas
    let extensionesValidas = ['png','jpg','gif','jpeg'];

    if(extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'La extensiones permitidas son '+ extensionesValidas.join()
            }
        })
    }

    //Cambiar nombre al archivo
    let nombreArchivo = `${ id }-${ new Date().getMilliseconds()}.${ extension }`

    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, function(err) {
        if (err)
          return res.status(500).json({
              ok: false,
              err
          });
        //Aqui la imagne se carga
        imagenUsuario(id, res, nombreArchivo)



    
        /*res.json({
            ok: true,
            message: 'Imagen subida correctamente'
        });*/
      });
})

function imagenUsuario(id, res, nombreArchivo) {
    Usuario.findById(id, (err, usuarioDB) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario no existe'
                }
            })
        }

        let pathImagen = path.resolve(__dirname, `../../uploads/usuarios/${ usuarioDB.img }`)
        //confirmar si el path existe
        if ( fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
        usuarioDB.img = nombreArchivo;
        usuarioDB.save((err, usuarioGuardado) => {
            res.json({
                ok: true,
                usuario: usuarioGuardado
            })
        })
    })
}

function imagenProducto() {

}

module.exports = app;