const libros = require('../models/biblioteca');
const path = require('path');

const getAllLibros = (req, res) => {
    libros.getAllLibros((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ libros: result });
    });
};

const getLibroByID = (req, res) => {
    const id = req.params.id;
    libros.getLibroByID(id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
    });
};

const createLibro = (req, res) => {
    const { titulo, autor, fecha_publicacion, genero } = req.body;
    const portada = req.file ? req.file.filename : null;

    if (portada) {
        const nuevoLibro = { titulo, autor, fecha_publicacion, genero, portada };
        libros.createLibro(nuevoLibro, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).send({ message: 'Libro creado con éxito', id: result.id });
        });
    } else {
        res.status(400).send('La portada es obligatoria');
    }
};

const updateLibro = (req, res) => {
    const id = req.params.id;
    const { titulo, autor, fecha_publicacion, genero } = req.body;
    const portada = req.file ? req.file.filename : null;

    const libroActualizado = { titulo, autor, fecha_publicacion, genero };
    if (portada) {
        libroActualizado.portada = portada;
    }

    libros.updateLibro(id, libroActualizado, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send({ message: 'Libro actualizado con éxito' });
    });
};

const deleteLibro = (req, res) => {
    const id = req.params.id;
    libros.deleteLibro(id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send({ message: 'Libro eliminado con éxito' });
    });
};

module.exports = {
    getAllLibros,
    getLibroByID,
    createLibro,
    updateLibro,
    deleteLibro
};
