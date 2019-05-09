const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()

app.use(fileUpload());

app.put('/upload', function(req, res) {
    if(!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha selecciona algun archivo'
            }
        })
    }

    let archivo = req.files.archivo;

    archivo.mv('uploads/filename.jpg', function(err) {
        if (err)
          return res.status(500).json({
              ok: false,
              err
          });
    
        res.json({
            ok: true,
            message: 'Imagen subida correctamente'
        });
      });
})

module.exports = app;