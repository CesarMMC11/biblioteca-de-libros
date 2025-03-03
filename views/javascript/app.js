const formulario = document.getElementById('form-libro');
const btn = document.getElementById('boton');
const API = 'http://localhost:3000/libros';
let libro_id = null;

async function cargarLibros() {
    try {
        const response = await fetch(API);
        if (!response.ok) {
            throw new Error('Error al cargar los libros: ' + response.statusText);
        }
        const data = await response.json();
        mostrarLibros(data.libros);
    } catch (error) {
        console.error('Error al cargar los libros:', error);
        alert('Hubo un error al cargar los libros.');
    }
}

function mostrarLibros(libros) {
    const dataLibros = document.getElementById('data-libros');
    dataLibros.innerHTML = '';

    libros.forEach(libro => {
        const div = document.createElement('div');
        div.className = 'card-libro';
        div.id = `card-libro-${libro.id}`;

        div.innerHTML = `
            <h4 class='titulo'>${libro.titulo}</h4>
            <p class='autor'>${libro.autor}</p>
            <p class='fecha_publicacion'>${libro.fecha_publicacion}</p>
            <p class='genero'>${libro.genero}</p>
            <img src="${libro.portada}" alt="Portada del libro">
            <div class = 'card-boton'>
            <button value="${libro.id}" onclick="editLibro(${libro.id})">Editar</button>
            <button value="${libro.id}" onclick="deleteLibro(${libro.id})">Eliminar</button>
            </div>
        `;

        dataLibros.appendChild(div);
    });
}

cargarLibros();

function deleteLibro(id) {
    fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('El libro se ha eliminado');
            cargarLibros();
        } else {
            alert('Error al eliminar el libro.');
        }
    }).catch(error => {
        console.error('Error al eliminar el libro:', error);
        alert('Hubo un error al eliminar el libro.');
    });
}

function editLibro(id) {
    const titulo = document.getElementById('titulo');
    const autor = document.getElementById('autor');
    const fecha_publicacion = document.getElementById('fecha_publicacion');
    const genero = document.getElementById('genero');

    const libro = document.getElementById(`card-libro-${id}`);

    titulo.value = libro.getElementsByClassName('titulo')[0].innerText;
    autor.value = libro.getElementsByClassName('autor')[0].innerText;
    fecha_publicacion.value = libro.getElementsByClassName('fecha_publicacion')[0].innerText;
    genero.value = libro.getElementsByClassName('genero')[0].innerText;

    libro_id = id;

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        saveLibro(libro_id);
    });
}

function saveLibro(id) {
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const fecha_publicacion = document.getElementById('fecha_publicacion').value;
    const genero = document.getElementById('genero').value;
    const portada = document.getElementById('portada').files[0];

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('autor', autor);
    formData.append('fecha_publicacion', fecha_publicacion);
    formData.append('genero', genero);
    formData.append('portada', portada);

    fetch(`${API}/${id}`, {
        method: 'PUT',
        body: formData
    }).then(response => {
        if (response.ok) {
            alert('El libro se ha actualizado');
            cargarLibros();
            formulario.reset();
        } else {
            alert('Error al actualizar el libro.');
        }
    }).catch(error => {
        console.error('Error al actualizar el libro:', error);
        alert('Hubo un error al actualizar el libro.');
    });
}

function createLibro() {
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const fecha_publicacion = document.getElementById('fecha_publicacion').value;
    const genero = document.getElementById('genero').value;
    const portada = document.getElementById('portada').files[0];

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('autor', autor);
    formData.append('fecha_publicacion', fecha_publicacion);
    formData.append('genero', genero);
    formData.append('portada', portada);

    fetch(API, {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            alert('El libro se ha guardado');
            cargarLibros();
            formulario.reset();
        } else {
            alert('Error al guardar el libro.');
        }
    }).catch(error => {
        console.error('Error al guardar el libro:', error);
        alert('Hubo un error al guardar el libro.');
    });
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (libro_id) {
        saveLibro(libro_id);
    } else {
        createLibro();
    }
    libro_id = null;
});
