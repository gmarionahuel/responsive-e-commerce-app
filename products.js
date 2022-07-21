
    
   


function verCarrito(){		    									//Muestra ventana de CARRITO
	
    let ventanaCarrito = document.getElementById('ventanaCarrito');
    if (ventanaCarrito.style.display == "block"){
    ventanaCarrito.style.display = 'none';
    }
    else{
        ventanaCarrito.style.display = "block"
    }


};

function ocultarCarrito(){									  //Oculta ventana de CARRITO
document.getElementById('ventanaCarrito').style.display = 'none';
};

const addToShoppingCartButton = document.querySelectorAll('.addToCart');
addToShoppingCartButton.forEach((addToCartButton) => {      

addToCartButton.addEventListener('click', addToCartClicked);        // escucha click sobre boton de agregar al carrito 
});                                                                 // y ejecuta dicha función con parametro event

function addToCartClicked(event) {      //Escucha click del usuario sobre botón de agregar al carrito, guarda datos de dicho elemento
const button = event.target;
const item = button.closest('.product__item');  
const itemName = item.querySelector('.description').textContent;
const itemPrice = item.querySelector('.price').textContent;
                                                                                                    
addItemToShoppingCart(itemName,itemPrice);      //Llama a funcion para agregar el producto al html, con los parametros de nombre y precio del producto
}
const productosCarrito = document.querySelector('.productosCarrito');       //ventana del carrito de compras

function addItemToShoppingCart(itemName,itemPrice){		        //Agrega producto al carrito de compras
    nombres = document.querySelectorAll('.nombre');  
    for(var i = 0; i < nombres.length; i++){ 
        let nombreElement =	nombres[i].textContent;     //Compara si el nombre del item que se quiere añadir coincide con algun nombre de la lista de productos agregaos al carrito, para evitar duplicados 
        if(itemName == nombreElement){
            let cantidadElemento = nombres[i].parentNode.parentNode.querySelector('.cantidad');
            cantidadElemento.value++;       //Si coincide el nombre, aumenta en 1 la cantidad de dicho producto en el carrito
            updateShoppingCartTotal();      // y actualiza el total
            document.getElementById('popupModified').style.display = "block"                //Avisa por pantalla que fue modificada la cantidad
            setTimeout(()=>{document.getElementById('popupModified').style.display = "none";},500)  
            return;             //Sale de la funcion para evitar que cree otra linea de HTML, pues el producto fue ya agregado y tambien fue actualizado el total. 
        }    
    }

    const shoppingCartRow = document.createElement('tr');
    shoppingCartRow.className = "elementoCarrito"
    const shoppingCartContent = `<tr class="productoCarrito"><td><p id="nombre" class="nombre">`+itemName+`</p></td><td class="tdCantidad"><input type="number" id="cantidadInput" min="1" max="20" class="cantidad" onChange="updateShoppingCartTotal();" value="1"></td><td><p id="precio" class="precio">`+itemPrice+`</p></td><td><p class="subtotalProductoCarrito"></p></td>   <td><button id ="buttonDelete" class="btn btn-danger buttonDelete" >X</button></td></tr>`;				//Agrego datos del producto al HTML	
	shoppingCartRow.innerHTML = shoppingCartContent;                    //Agrega el producto al Carrito
    productosCarrito.append(shoppingCartRow);

    botones = shoppingCartRow.querySelectorAll('.buttonDelete');            //Borrar elemento del Carrito
    botones.forEach((deleteButton)=>{
        deleteButton.addEventListener('click',removeProduct);
    })
   updateShoppingCartTotal();

   document.getElementById('popupAdded').style.display = "block"           //Notificación de que el producto fue agregado correctamente
   setTimeout(()=>{document.getElementById('popupAdded').style.display = "none";},500)	//Desaparece notificación con timer .5'
}

function updateShoppingCartTotal(){                 //Actualiza total
    let suma=0;
    let totalElement = document.querySelector(".total");
    var quantity = document.querySelectorAll('.cantidad');
    var price =  document.querySelectorAll('.precio');
    var subtotals = document.querySelectorAll('.subtotalProductoCarrito');
    
    for(var i = 0; i < quantity.length; i++){ 
        let priceElement =	Number(price[i].textContent.replace('$',''));
        subtotals[i].textContent = Number(quantity[i].value) * priceElement;
        suma = Number(suma) + Number(subtotals[i].textContent)
        
    }
    totalElement.textContent ='$'+ suma;

}
function removeProduct(event) {
    const button = event.target;                        //botón clickado por el usuario
    let item = button.closest(".elementoCarrito");          
    button.closest('.elementoCarrito').remove();        //elimino html del elemento más cercano con la clase especificada
    updateShoppingCartTotal();
}
function leePedido(){
    let cantidad = document.querySelectorAll('.cantidad');      //  Vector con cantidades
    let innerTotal = document.getElementById('total').innerText;    //Lee todo el texto, sin numeros (X en su lugar)
    let mensaje = document.getElementById('productosCarrito').innerText;
    for(var i=0;i<cantidad.length;i++){
     mensaje = mensaje.replace('X',''+cantidad[i].value+'');        // Reemplazo las 'X' con los valores del vector
    }      
    
    let pedido = mensaje +' Total: '+innerTotal;
    console.log(pedido);          //  Muestro pedido  FORMATO  [Nombre del produto] [$Precio] [Cantidad] [Subtotal] ... [Total:] [$Total]                     
}



var elInput = document.getElementById('inputSearch');       //Detecta si se apreta tecla ENTER en el buscador, y ejecuta funcion buscar.
elInput.addEventListener('keyup', function(e) {
  var keycode = e.keyCode || e.which;
  if (keycode == 13) {
    buscar();
  }
});

function buscar(){
    var nombreProductos = document.querySelectorAll('.description');    // vector con elementos con nombres de productos
    let textoBuscado = document.getElementById('inputSearch');      //  input donde usuario ingresa texto a buscar
    let a=document.getElementById('resultadoBusqueda');
    let contador = 0;
    const busqueda = textoBuscado.value.toLocaleLowerCase();      //texto que el usuario quiere buscar 
    for(var i=0;i<nombreProductos.length;i++){

        if (nombreProductos[i].innerHTML.toLocaleLowerCase().includes(busqueda)){      //si el nombre incluye el texto ->
            
            nombreProductos[i].parentNode.style.display = "block"       // busca coincidencia en nombre del elemento
            contador+=1;                                                //  si hay coincidencia, muestra elemento
        }
        else if(productoCatalogo[i].classList.contains(busqueda)){         //busca coincidencias con clase (categorias)
            productoCatalogo[i].style.display = "block"     
            contador+=1;

        }
        else{ nombreProductos[i].parentNode.style.display = "none"}     //Si no encuentra coincidencia por nombre ni por clase, esconde el producto.
    } 
    a.textContent = '';
    if(contador<1){              //Si no hay ninguna coincidencia, avisa que no se encontro nada    
    document.getElementById('resultadoBusqueda').textContent = 'No se encontraron resultados relacionados con "'+busqueda+'". Por favor, pruebe con algo distinto';}
    if((contador>0) && (busqueda != '') ){
    document.getElementById('resultadoBusqueda').textContent ='Mostrando resultados para: '+busqueda;
    }
    textoBuscado.value = '';        //vuelve el texto del input a vacio
     
}

const botonesCategoria = document.querySelectorAll('.category__item'); 
const productos = 
botonesCategoria.forEach((btnCategoria)=>{
btnCategoria.addEventListener('click', filtrar) ;
})

const productoCatalogo = document.querySelectorAll('.product__item');

function filtrar(event){
    var filtro = event.target.textContent.toLocaleLowerCase();      //categoria que el usuario quiere filtrar
  
    for(var i=0;i<productoCatalogo.length;i++){
    if (productoCatalogo[i].classList.contains(filtro)){
        productoCatalogo[i].style.display = "block";        //si coincide muestra elemento

    }
    
   else{
        productoCatalogo[i].style.display = "none";     //si no coincide esconde
   }
 }
}

console.log("e-commerce desarrollado por gmarionahuel@gmail.com GitHub @gmarionahuel Twitter @ggmarionahuel.")
   
function refrescaBusqueda(){
    document.getElementById('searchBar').style.display= "none"; //esconde buscador 
    document.getElementById('lupa').style.display ="block";     //abre lupa
    let buscador = document.getElementById('inputSearch');  
    buscador.value = "";        //deja vacio el input
    buscar();       //ejecuta la funcion buscar con el contenido vacio del input, que devuelve la totalidad de objetos. (Cuando cierra el buscador, se muestran todos los objetos)
    
}

function verBuscador(){     
    document.getElementById('lupa').style.display ="none";  //esconde lupa
    document.getElementById('searchBar').style.display ="flex"; //muestra buscador
}



/*Desarrollado por gmarionahuel, gmarionahuel@gmail.com GitHub @gmarionahuel Twitter@gmarionahuel

    Software de uso libre, no permitida la venta de este producto.
    Si alguien te vendió este software, o queres dejarme cualquier comentario, dejamelo saber en los medios mencionados arriba
*/ 


function verFiltros(){
    let filtros = document.getElementById('category__listMedia')
    if (filtros.style.display != "none"){
        filtros.style.display = "none";
    }
    else{
        filtros.style.display = "flex";
    }
}