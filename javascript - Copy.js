const API_URL = "https://localhost:7207/api/Libro/getAllBooks"
const xhr = new XMLHttpRequest();

function onRequestHandler()
{
	//0 = UNSET 1 = OPENED, 2 = HEADERS_RECEIVED, 3 = LOADIND 
	if(this.readyState == 4 && this.status == 200)
	{
		 let librosRecibidos = JSON.parse(this.response)
			console.log(librosRecibidos)
	}	
}
xhr.addEventListener("load",onRequestHandler);
xhr.open('GET', API_URL);
xhr.send();


let books = [
    {
        title: "1984",
        author: "George Orwell",
        summary:
            "En un futuro distópico, un hombre lucha contra un gobierno opresivo que controla todos los aspectos de la vida.",
        publicationDate: "1949",
        genre: "ficción",
        language: "Francés",
        Image: "./images/images.jpg",
        Relevance: '1',
        id: 1,
    },
    {
        title: "La Metamorfosis",
        author: "Franz Kafka",
        summary:
            "Un hombre se despierta un día para descubrir que se ha transformado en un insecto.",
        publicationDate: "1915",
        genre: "Romance",
        language: "Español",
        Image: "./images/portada_image.jpeg",
        Relevance: '5',
        id: 2,
    },
    {
        title: "Cien años de soledad",
        author: "Gabriel García Márquez",
        summary:
            "Una familia en un pueblo aislado experimenta una serie de eventos extraños a lo largo de varias generaciones.",
        publicationDate: "1967",
        genre: "mágico",
        language: "Español",
        Image: "./images/portada1.jpg",
        Relevance: '2',
        id: 3,
    },
    {
        title: "El Gran Gatsby",
        author: "F. Scott Fitzgerald",
        summary:
            "Un hombre rico intenta recuperar a su amor de juventud mientras enfrenta los desafíos de la vida en los años 20.",
        publicationDate: "1925",
        genre: "ficción",
        language: "Inglés",
        Image: "./images/portada2.jpeg",
        Relevance: '3',
        id: 4,
    },
    {
        title: "Matar a un ruiseñor",
        author: "Harper Lee",
        summary:
            "Una joven aprende sobre el racismo y la injusticia en el sur de los Estados Unidos durante los años 30.",
        publicationDate: "1960",
        genre: "Romance",
        language: "Inglés",
        Image: "./images/portada3.jpeg",
        Relevance: '4',
        id: 5,
    },
];
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Your form submission code goes here
});

//const librosRecibidos;


//Obtener filtros
console.log("Test ")
//console.log(librosRecibidos)

let filteredBooks = books;//books; // set default value for filtered books
const vista = document.querySelector(".vista-cuadricula");
const libros = document.querySelectorAll(".libro");
function filtrarLibros() {
    libros.forEach((libro) => libro.remove());
    init(filteredBooks);
}
function mostrarTodos() {
    filteredBooks = librosRecibidos;
    filtrarLibros();
}
function obtenerGenero(genero) {
    if (genero === "Todos") {
        mostrarTodos();
    } else {
        filteredBooks = librosRecibidos.filter((book) => book.genre === genero);
        filtrarLibros();
    }
}
function obtenerIdioma(idioma) {
    if (idioma === "Todos") {
        mostrarTodos();
    } else {
        filteredBooks = librosRecibidos.filter((book) => book.language === idioma);
        filtrarLibros();
    }
}
function obtenerTitulo(titulo) {
    if (titulo === "Todos") {
        mostrarTodos();
    } else {
        filteredBooks = librosRecibidos.filter((book) => book.title.toLowerCase() === titulo.toLowerCase());
        filtrarLibros();
    }
    debugger;
}
function obtenerRelevance(relevance) {
    if (relevance === "Todos") {
        mostrarTodos();
    } else {
        filteredBooks = librosRecibidos.filter((book) => book.Relevance === relevance);
        filtrarLibros();
    }
}

function init(filteredBooks) {
    limpiarVista();
    filteredBooks.forEach((book) => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        const button = document.createElement("button");
        button.addEventListener("click", mostrarDetalles);
        div.classList.add("libro");
        img.src = book.Image;
        h3.textContent = book.title;
        p1.textContent = book.author;
        p2.textContent = book.summary;
        button.textContent = "Detalles";
        button.setAttribute("id", book.id);
        div.append(img, h3, p1, p2, button);
        vista.appendChild(div);
    });
}
function limpiarVista() {
    const vista = document.querySelector(".vista-cuadricula");
    while (vista.firstChild) {
        vista.removeChild(vista.firstChild);
    }
}
const detallesPopup = document.getElementById("popup-detalles");
const tituloDetalle = document.querySelector(".detalle-titulo");
const autorDetalle = document.querySelector(".detalle-Autor");
const resumenDetalle = document.querySelector(".detalle-Resumen");
const reseñasDetalle = document.querySelector(".detalle-Reseñas");
const botonCerrar = document.getElementById("boton-cerrar");
function mostrarDetalles(evento) {
    evento.preventDefault();
    const libroId = evento.target.id;
    const libro = filteredBooks.find((book) => book.id === Number(libroId));
    tituloDetalle.textContent = libro.title;
    autorDetalle.textContent = `Autor: ${libro.author}`;
    resumenDetalle.textContent = `Resumen: ${libro.summary}`;
    reseñasDetalle.textContent = `Relevancia: ${libro.Relevance}`;
    detallesPopup.style.display = "block";
}
botonCerrar.addEventListener("click", () => {
    detallesPopup.style.display = "none";
});
const botonesDetalles = document.querySelectorAll(".boton-detalles");
botonesDetalles.forEach((boton) => {
    boton.addEventListener("click", mostrarDetalles);
});
const selectGenero = document.getElementById("genero");
const selectIdioma = document.getElementById("idioma");
const selectRelevance = document.getElementById("relevancia");
const searchTitle = document.getElementById("searchTitle");
selectGenero.addEventListener("change", () => {
    obtenerGenero(selectGenero.value);
});
selectIdioma.addEventListener("change", () => {
    obtenerIdioma(selectIdioma.value);
});
selectRelevance.addEventListener("change", () => {
    obtenerRelevance(selectRelevance.value);
});
searchTitle.addEventListener("change", () => {
    obtenerTitulo(searchTitle.value);
});

filtrarLibros(); // render initial books
