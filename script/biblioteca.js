export const biblioteca = {
    //Data
    libros:[],
    //Comportamiento
    paginas:function(numPaginas) {
        return this.libros.filter((libro) => libro.numpaginas > numPaginas)
    },
    
    buscarAutor: (autor) => biblioteca.libros.find(libro => libro.autor === autor),

    buscarTitulo: (titulo) => biblioteca.libros.find(libro => libro.titulo === titulo),

    color: (color) => biblioteca.libros.findIndex(libro => libro.color === color),

    forrar:function() {
        //Las 2 formas están bien
        //this.libros = this.libros.map((libro) => Object.assign({forrado:true}, libro));
        this.libros = this.libros.map((libro) => ({...libro, forrado:true}));
    },

    listarLibros:function() {
        this.libros.forEach((libro) => console.log(libro))
    },

    prestar: function(titulo){
        const libroAPrestar = this.buscarTitulo(titulo);
        console.log(libroAPrestar);
        if(libroAPrestar !== undefined){
            //Actualiza la librería
            this.libros = this.libros.filter((libro) => libro.titulo.toUpperCase() != libroAPrestar.titulo.toUpperCase());
        }
        return libroAPrestar;
    },

    devolver: function(libroDevuelto){
        if(libroDevuelto !== null && libroDevuelto !== undefined){
            if(this.buscarTitulo(libroDevuelto.titulo) === undefined){
                this.libros.unshift(libroDevuelto); //Agrega el elemento al inicio del array
            }
        }
    },
    mostrar: function(){
        const main = document.querySelector(".container");
        let i = 0;
        main.innerHTML="";
        this.libros.forEach((libro, index) => {
            main.innerHTML+= 
            `<div class="card">
                <div class="Box">
                <div class = "img">
                    <h2>${libro.titulo}</h2>
                </div>
                </div>
                <div class="details">
                    <p> 
                        <strong>Autor: </strong> ${libro.autor} <br>
                        <strong>Número de páginas: </strong>  ${libro.numPaginas} <br>
                        <strong>Editorial: </strong> ${libro.editorial} <br>
                        <strong>Forrado: </strong> ${libro.forrado > 0 ? 'Si' : 'No'}<br>
                    </p> 
                </div>
            </div>`
            //aplicar color
            document.querySelectorAll(".img")[index].style.background= `linear-gradient(0deg, white -140%, ${libro.color} 40%, black 280%)`;
            
            //aplicar efecto de forrado
            libro.forrado > 0 ? 
            document.querySelectorAll(".img")[index].style.animation += "forrado 3s infinite linear 1s" 
            : document.querySelectorAll(".img")[index].style.animation = "";
           
        })
    }
}