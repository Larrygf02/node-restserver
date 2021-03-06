
//Puerto
process.env.PORT = process.env.PORT || 3000;

//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//VENCIMIENTO DEL TOKEN
//60 SEGUNDOS * 60 MINUTOS * 24 HORAS * 30 DIAS
process.env.CADUCIDAD_TOKEN = '48h';

//SEED
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'

//BASE DE DATOS
let urlDB;

if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//Google Client ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '950013897649-plnblj5pi04o63ddl0b6l105fe8lmqa9.apps.googleusercontent.com'