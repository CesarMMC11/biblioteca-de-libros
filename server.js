const express = require('express');
const multer = require('multer');
const path = require('path');
const { db } = require('./database/db');
const routesBooks = require('./routes/rutas');

const app = express();
const port = 3000;

// Configuración de Multer para guardar imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'uploads')));


// Rutas
app.use('/libros', upload.single('portada'), routesBooks);

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log('Conexión exitosa a la base de datos');
});
