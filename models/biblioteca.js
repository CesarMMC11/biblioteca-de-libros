const db = require('../database/db')
const libros = {
    getAllLibros: function (callback) {
        const query = 'SELECT * FROM libros';
        db.query(query, [], (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    },
    getLibroByID: function (id, callback) {
        const query = 'SELECT * FROM libros WHERE id = ?';
        db.query(query, [id], (err, row) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, row);
            }
        });
    },
    createLibro: function (libro, callback) {
        const query = 'INSERT INTO libros (titulo, autor, fecha_publicacion, genero, portada) VALUES (?, ?, ?, ?, ?)';
        const valores = [libro.titulo, libro.autor, libro.fecha_publicacion, libro.genero, libro.portada];
        db.query(query, valores, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, { id: result.insertId });
            }
        });
    },
    updateLibro: function (id, libro, callback) {
        const query = 'UPDATE libros SET titulo = ?, autor = ?, fecha_publicacion = ?, genero = ?, portada = ? WHERE id = ?';
        const valores = [libro.titulo, libro.autor, libro.fecha_publicacion, libro.genero, libro.portada, id];
        db.query(query, valores, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, { changes: result.affectedRows });
            }
        });
    },
    deleteLibro: function (id, callback) {
        const query = 'DELETE FROM libros WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, { changes: result.affectedRows });
            }
        });
    }
};

module.exports = libros;
