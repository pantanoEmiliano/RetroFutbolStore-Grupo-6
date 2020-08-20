obtener_locastorage();
function obtener_locastorage(){

let nombre = localStorage.getItem("nombre");
let persona = JSON.parse(localStorage.getItem("persona")) ;

console.log( nombre );
console.log( persona )


}

guardar_localstorage();




function guardar_localstorage(){

    let persona ={

        nombre: "equipo",
        precio: 3000,
        edad: 33

    };
let nombre = "juan";

localStorage.setItem( "nombre",  nombre );

localStorage.setItem( "persona", JSON.stringify(persona) )
}