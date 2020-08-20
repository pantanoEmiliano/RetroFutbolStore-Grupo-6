window.addEventListener('load', function(){
    let validationUser = document.getElementById("profile");
    if (validationUser == null) {
  Swal.fire({
  title: '<strong>NO SOS <u>USUARIO?</u></strong>',
  icon: 'info',
  html:
    'Usuarios tienen descuentos en sus compras, ' +
    '<a href="http://localhost:3000/users/create">Registrate!</a> ',
  showCloseButton: true,
  showCancelButton: false,
  focusConfirm: false,
  confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Genial!',
  confirmButtonAriaLabel: 'Thumbs up, great!',
  cancelButtonText:
    '<i class="fa fa-thumbs-down"></i>',
  cancelButtonAriaLabel: 'Thumbs down'
})
}
  });


class Carrito {

/*    //Añadir producto al carrito
    comprarProducto(e){
        e.preventDefault();
        //Delegado para agregar al carrito
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement.parentElement;
            //Enviamos el producto seleccionado para tomar sus datos
            this.leerDatosProducto(producto);
        }
    }
*/
    //Leer datos del producto
     /*  leerDatosProducto(){
     

        const infoProducto = {
            image: producto.querySelector('img').src,
            nombre: producto.querySelector('h4').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }
       
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS){
            if(productoLS.id === infoProducto.id){
                productosLS = productoLS.id;
            }
        });

        if(productosLS === infoProducto.id){
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'El producto ya está agregado',
                showConfirmButton: false,
                timer: 1000
            })
        }
        else {
            this.insertarCarrito(infoProducto);
        }
        
    }
 */
  /*   //muestra producto seleccionado en carrito
    insertarCarrito(producto){
       
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.image}" width=100>
            </td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="btn-danger" data-id="${producto.id}"></a>
            </td>
        `;
        listaProductos.appendChild(row);

        this.guardarProductosLocalStorage(producto);
      

    }
*/
    //Eliminar el producto del carrito en el DOM
  /*
    eliminarProducto(e){
    
      e.preventDefault();
       
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')){
           e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
           productoID = producto.querySelector('a').getAttribute('data-id');
        }
    
        this.eliminarProductoLocalStorage(productoID);
 
        this.calcularTotal();

    }
*/
 


/* =============== ACA EMPIEZA JS PARA CONF COMPRA =================== */
   
   /*  ESTE GUARDADO NO ES NECESARIO PORQUE YA SE HIZO EN EL HOME/FUNCTIONCARRITO 
    //Almacenar en el LS
    guardarProductosLocalStorage(producto){
        let productos;
        //Toma valor de un arreglo con datos del LS
        productos = this.obtenerProductosLocalStorage();
        //Agregar el producto al carrito
        productos.push(producto);
        //Agregamos al LS
        SessionStorage.setItem('productos', JSON.stringify(productos));
    }

        */


    //Comprobar que hay elementos en el LS
    obtenerProductosLocalStorage(){
        let productoLS;

        //Comprobar si hay algo en LS
        if(sessionStorage.getItem('session') === null){
            productoLS = [];
        }
        else {
            productoLS = JSON.parse(sessionStorage.getItem('session'));
        }
        return productoLS;
    }
 /* 
    //Mostrar los productos guardados en el LS
    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
      productosLS.forEach(function (producto){
            //Construir plantilla
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.image}">
                </td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>
                <a class="btn-danger" style="padding:10px" href="#" data-id="${producto.id}"></a>
                </td>
            `;
            listaProductos.appendChild(row);
        });

    }
*/
    //Mostrar los productos guardados en el LS en compra.html
    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td> <img src="${producto.image}"> </td>
                
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>
                    <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
                </td>
                <td id='subtotales'>${producto.precio * producto.cantidad }</td>
                <td>
                    <a type="button" class="borrar-producto btn-danger" style="padding:10px" href="#" data-id="${producto.id}">X</a>
                    
                </td>
            `;
            listaCompra.appendChild(row);
        });
    }





        eliminarProducto(e){
   
        e.preventDefault();
    /*    
        let productos
        productos = this.obtenerProductosLocalStorage();
        
        if(e.target.classList.contains('borrar-producto')){
            productos.forEach(function(producto){
            e.target.parentElement.parentElement.remove();             
            producto = e.target.parentElement.parentElement;
            productoID = producto.id;
            })  
        }
        this.eliminarProductoLocalStorage(productoID);
 */
        this.calcularTotal();
}


    //Eliminar producto por ID del LS
    eliminarProductoLocalStorage(){
        let productosLS;
        //Obtenemos el arreglo de productos
        productosLS = this.obtenerProductosLocalStorage();
        //Comparar el id del producto borrado con LS
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });

        //Añadimos el arreglo actual al LS // OJO ACA, CONVIENE CAMBIAR
        // LA VARIABLE PRODUCTOS POR SESSION" 
        sessionStorage.setItem('session', JSON.stringify(productosLS));
    }

        //Elimina todos los productos
   
    vaciarCarrito(e){
        e.preventDefault();
        Swal.fire({
          title: 'Seguro?',
          text: "Deberas volver a seleccionar productos",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, seguro!'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Borrado!',
              'Tu seleccion fue borrada.',
              'success'
            )
          } 
        })
        while(listaCompra.firstChild){
            listaCompra.removeChild(listaCompra.firstChild);
        } 
        this.vaciarLocalStorage();
        this.calcularTotal();
        return false;
    }

    //Eliminar todos los datos del LS
    vaciarLocalStorage(){
        sessionStorage.clear();
    }

    /* ESTO DEBERIA IR EN CARRITOFUNCTION QUIZAS 
    //Procesar pedido
    procesarPedido(e){
        e.preventDefault();

        if(this.obtenerProductosLocalStorage().length === 0){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'El carrito está vacío, agrega algún producto',
                showConfirmButton: false,
                timer: 2000
            })
        }
        else {
            location.href = "/carrito/comprar";
        }
    } 
    */

    //Calcular montos
    calcularTotal(){
        let productosLS;
        let total = 0, iva = 0, subtotal = 0;
        productosLS = this.obtenerProductosLocalStorage();
        for(let i = 0; i < productosLS.length; i++){
            let element = Number(productosLS[i].precio * productosLS[i].cantidad);
            total = total + element;          
        }
        
        iva = parseFloat(total * 0.105).toFixed(2);
        subtotal = parseFloat(total-iva).toFixed(2);

        document.getElementById('subtotal').innerHTML = "$ " + subtotal;
        document.getElementById('iva').innerHTML = "$ " + iva;
        document.getElementById('total').value = "$ " + total.toFixed(2);
    }


    obtenerEvento(e) {
        e.preventDefault();
        let id, cantidad, producto, productosLS;
        if (e.target.classList.contains('cantidad')) {
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector('a').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;
            let actualizarMontos = document.querySelectorAll('#subtotales');
            productosLS = this.obtenerProductosLocalStorage();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;                    
                    actualizarMontos[index].innerHTML = Number(cantidad * productosLS[index].precio);
                }    
            });
            sessionStorage.setItem('session', JSON.stringify(productosLS));
            
        }
        else {
            console.log("click afuera");
        }
    }

}

    //function sendToServer() {
   
    document.getElementById("datas").value = sessionStorage.getItem('session');
    console.log(document.getElementById("datas").value);

        /*let settings = {
        "method": "POST",
        "body": JSON.stringify(purchase)
    }
    fetch('http://localhost:3000/carrito/comprar/conf', settings)   
        .then(function(response) {
            return response.json();
        })
        .then(function(info) {
            conssole.log(info)
        })
       .catch(function(e) {
        console.log("Error! " + e);
        })  

}*/



const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');


cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    //Eliminar productos del carrito
    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) });

    compra.calcularTotal();

     //Al vaciar carrito
    vaciarCarritoBtn.addEventListener('click', (e)=>{compra.vaciarCarrito(e)});

    //cuando se selecciona procesar Compra
    procesarCompraBtn.addEventListener('click', procesarCompra);

    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });

}


function procesarCompra(e) {
    let errors = [];
   // e.preventDefault(); 
    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            showConfirmButton: true,
            timer: 2000000
        })
           .then(function() {
           window.location = "/Home";
        }) 
        errors.push("faltan productos elegir");
    }

     if (cliente.value === '' || correo.value === '') {
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese todos los campos requeridos',
            showConfirmButton: true,
            timer: 20000000
        })
         errors.push("faltan datos de comprador");   
    }

         if (errors.length > 0) {
         e.preventDefault();

    } else { 
            Swal.fire({
            icon: 'success',
            title: 'Gracias por tu compra, volve pronto',
            showConfirmButton: true,
            timer: 2000000
            })  
            .then(function() {
            console.log("ok")
        }) 
        //sessionStorage.clear(); 
    }   
}    
    