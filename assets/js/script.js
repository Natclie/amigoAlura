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

function agregarNombre() {
    
    let nombre = document.getElementById("nombre").value.trim();
    if (nombre && !nombres.includes(nombre)) {
        nombres.push(nombre);
        ulLista.innerHTML += `<li>${nombre}</li>`;
        inpNombre.value = "";
        btnSortear.classList.add("sortear-active")
        aniSortear();
    }else{
        pMsg.innerText = "Agrega un nombre valido.";
        alertOn();
    }
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
    ulLista.innerHTML = "";
    pMsg.innerText = "La lista ha sido vaciada.";
    alertOn();
}

document.getElementById("nombre").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        agregarNombre();
    }
});

