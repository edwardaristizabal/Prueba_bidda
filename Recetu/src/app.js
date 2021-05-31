const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const mimeTypes = require('mime-Types');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, cb){
        cb("", Date.now() + file.originalname + "." + mimeTypes.extension(file.mimeType));
    }
});

const upload = multer({
    storage: storage
});

//Configuración
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.post("/files", upload.single(''), (req, res) => {
    res.send("")
});

//Routes
app.use(require('./routes/index.js'));

//Static
app.use(express.static(path.join(__dirname, 'public')));

//Error 404
app.use((req, res, next) => {
    res.status(404).send('Error 404 No encontrado');
})

module.exports = app;
