const API_URL_LIBROS = "https://localhost:7207/api/Libro/getAllBooks"
const API_URL_GENEROS = "https://localhost:7207/api/Libro/getAllBooks"
const xhr = new XMLHttpRequest();
var librosRecibidos = [];
var filteredBooks = [];
function onRequestLibrosHandler()
{
	//0 = UNSET 1 = OPENED, 2 = HEADERS_RECEIVED, 3 = LOADIND 
	if(this.readyState == 4 && this.status == 200)
	{
		var response = this.response;
		  librosRecibidos = JSON.parse(response)
		  filteredBooks = librosRecibidos;
			console.log(librosRecibidos)
			init(librosRecibidos);
	}	
}

function onRequestGenerosHandler()
{
	//0 = UNSET 1 = OPENED, 2 = HEADERS_RECEIVED, 3 = LOADIND 
	if(this.readyState == 4 && this.status == 200)
	{
		var responseGeneros = this.response;
		  generosRecibidos = JSON.parse(responseGeneros)
		  //filteredBooks = librosRecibidos;
			cargaGeneros(generosRecibidos);
	}	
}

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Your form submission code goes here
});




//Obtener filtros
console.log("Test ")
//console.log(librosRecibidos)

//let filteredBooks = books;//books; // set default value for filtered books
const vista = document.querySelector(".vista-cuadricula");
const libros = document.querySelectorAll(".libro");
function filtrarLibros() {
       libros.forEach((libro) => libro.remove());
      init(filteredBooks);
}

function getDataInit() {
   // libros.forEach((libro) => libro.remove());
    getLibrosInit();
	//getGenerosInit();
	
}

function getGenerosInit() {
   // libros.forEach((libro) => libro.remove());
    
	xhr.addEventListener("load",onRequestGenerosHandler);
	xhr.open('GET', API_URL_GENEROS);
	xhr.send();
	
}


function getLibrosInit() {
   // libros.forEach((libro) => libro.remove());
    
	xhr.addEventListener("load",onRequestLibrosHandler);
	xhr.open('GET', API_URL_LIBROS);
	xhr.send();
	
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
        filteredBooks = librosRecibidos.filter((book) => book.relevance === relevance);
        filtrarLibros();
    }
}


function cargaGeneros(generos) {
    
	var selectorGeneros = document.getElementById("genero");
	var contador = 0;
    generos.forEach((genero) => {
		selectorGeneros.options[contador] = new Option(genero.id, genero.descripcion);
		contador++;
    });
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
        img.src = book.image;
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
    reseñasDetalle.textContent = `Relevancia: ${libro.relevance}`;
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

getDataInit(); // render initial books
