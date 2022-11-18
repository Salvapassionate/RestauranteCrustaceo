const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos')
const btnAlmuerzos = document.querySelector('.almuerzos')
const btnMarisco = document.querySelector('.marisco')
const btnInfantil = document.querySelector('.infante')
const contenedorPlatillos = document.querySelector('.platillos');



document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    platillos();
});

const eventos = () =>{
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () =>{
     navegacion.classList.remove('ocultar');
     botonCerrar();
}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p');
    const overlay  = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');

     while(navegacion.children[5]){
        navegacion.removeChild(navegacion.children[5]);
    }
    navegacion.appendChild(btnCerrar);   
    cerrarMenu(btnCerrar,overlay);
    
}

const observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const imagen = entry.target;
                imagen.src = imagen.dataset.src;
                observer.unobserve(imagen);
            }
        }); 
});


imagenes.forEach(imagen=>{
   
    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');  
        boton.remove();
    }
}

const platillos = () =>{
    let platillosArreglo = [];
    const platillos = document.querySelectorAll('.platillo');

    platillos.forEach(platillo=> platillosArreglo = [...platillosArreglo,platillo]);

    const almuerzos = platillosArreglo.filter(almuerzo=> almuerzo.getAttribute('data-platillo') === 'almuerzo');
    const mariscos = platillosArreglo.filter(marisco => marisco.getAttribute('data-platillo') === 'marisco');
    const infantiles = platillosArreglo.filter(infante => infante.getAttribute('data-platillo') === 'infantil');
    
    mostrarPlatillos(almuerzos, mariscos, infantiles,  platillosArreglo);

}

const mostrarPlatillos = (almuerzos, mariscos, infantiles,  todos) =>{
    btnAlmuerzos.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        almuerzos.forEach(almuerzo=> contenedorPlatillos.appendChild(almuerzo));
    });

    btnMarisco.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
         mariscos.forEach(marisco=> contenedorPlatillos.appendChild(marisco));
    });

    btnInfantil.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        infantiles.forEach(infante=> contenedorPlatillos.appendChild(infante));
    });
   
    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorPlatillos);
        todos.forEach(todo=> contenedorPlatillos.appendChild(todo));
    });
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}

