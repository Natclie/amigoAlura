let nombres = [];
//CONTENEDOR MENSAJE
let alertPop = document.getElementById('alert');
//PARRAFO DEL MENSAJE
let pMsg = document.getElementById('alert-msg');
//LISTA DE AMIGOS A SORTEAR
let ulLista = document.getElementById('lista');
//INPUT NOMBRE
let inpNombre = document.getElementById('nombre');
//BOTON SORTEAR
let btnSortear = document.getElementById('btn-sortear');

const itemsPerPage = 8;
let currentPage = 1;

function alertOn(){
    alertPop.classList.add('alertActive');
    alertPop.classList.remove('alertNotActive');
}

function alertOff(){
    alertPop.classList.add('alertNotActive');
    alertPop.classList.remove('alertActive');
}

function aniSortear(){
    btnSortear.addEventListener("click", function() {
        let icono = this.querySelector("i");
        icono.classList.add("dace-active");
        
        setTimeout(() => {
            icono.classList.remove("dace-active");
        }, 500);
    });
}

function renderList() {
    ulLista.innerHTML = "";
    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedItems = nombres.slice(start, end);
    paginatedItems.forEach((nombre, index) => {
        ulLista.innerHTML += `<li>${nombre} <button onclick="eliminarNombre(${start + index})"><i class="fa-regular fa-trash-can trash"></i></button></li>`;
    });
    document.getElementById("pageNumber").innerText = currentPage;
}

function agregarNombre() {
    let nombre = document.getElementById("nombre").value.trim();
    if (nombre && !nombres.includes(nombre)) {
        nombres.push(nombre);
        inpNombre.value = "";
        btnSortear.classList.add("sortear-active");
        aniSortear();
        renderList();
    } else {
        pMsg.innerText = "Agrega un nombre valido.";
        alertOn();
    }
}

function eliminarNombre(index) {
    nombres.splice(index, 1);
    renderList();
}
        
function sortear() {
    if (listaVacia()) {
        pMsg.innerText = "Agrega al menos 1 nombre para sortear.";
        alertOn();
        return;
    }
    let elegido = nombres[Math.floor(Math.random() * nombres.length)];
    pMsg.innerText = `El amigo secreto es: ${elegido}`;
    alertOn();
}
function listaVacia() {
    return nombres.length === 0;
}
function Limpiar() {
    nombres = [];
    currentPage = 1;
    renderList();
    pMsg.innerText = "La lista ha sido vaciada.";
    alertOn();
}

function nextPage() {
    if ((currentPage * itemsPerPage) < nombres.length) {
        currentPage++;
        renderList();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderList();
    }
}

document.getElementById("nombre").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        agregarNombre();
    }
});

