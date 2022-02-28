const grid = new Muuri(".grid", {
    layout: {
        rounding: false,
    },
});

window.addEventListener("load", () => {
    grid.refreshItems().layout();
    const gridHtml = document.getElementById("grid");
    gridHtml.classList.add("imagenes-cargadas");

    // Categorias de los enlaces
    const enlaces = document.querySelectorAll("#categorias a");
    enlaces.forEach((enlace) => {
        enlace.addEventListener("click", (e) => {
            e.preventDefault();
            enlaces.forEach((elemento) => elemento.classList.remove("activo"));
            e.target.classList.add("activo");

            const categoria = e.target.innerHTML.toLowerCase();
            categoria === "todos"
                ? grid.filter("[data-categoria]")
                : grid.filter(`[data-categoria = "${categoria}"]`);
        });
    });

    //  Barra de busqueda

    const search = document.querySelector('#search')
    search.addEventListener('input', (e) => {
        const busqueda = e.target.value;
        grid.filter((item) => item.getElement().dataset.etiqueta.includes(busqueda));
    });

    //  Listener para overlay
    
    const overlay = document.getElementById('overlay');
    const imgGrid = document.querySelectorAll('.grid .item img');
    imgGrid.forEach( elemento => {
        
        elemento.addEventListener('click', () => {
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
            overlay.classList.add('activo');
            document.querySelector('#overlay img').src  = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        })

    })
 
// listener del boton cerrar

    const cerrar = document.getElementById('cerrar-overlay');
    cerrar.addEventListener('click', () => {
        overlay.classList.remove('activo');
    })
    
// cerrar haciendo click en el overlay
overlay.addEventListener('click', (e) => {
    e.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
});
    


});
