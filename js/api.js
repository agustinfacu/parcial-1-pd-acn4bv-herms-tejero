// api para obtener informacion de servicios
const API_URL = "https://jsonblob.com/api/jsonBlob/1420033092164444160";
const servicios = []; // array para guardar servicios  
const categorias = []; // array para guardar categorias

// funcion para cargar los datos de la api en los arrays
const cargarData = async () => {
  const response = await fetch(API_URL);
  // uso el condicional para verificar que la respuesta sea correcta
  if(response.status === 200) {
      const data = await response.json();
      const categoriasData = data.productos.categorias;
      categorias.push(...categoriasData);
     console.log("data ", categorias[0]);
      servicios.push(...data.productos.servicios); 
    imprimir();
  }
  
};

// llamo a la funcion para cargar los datos
cargarData();

// funcion para imprimir los productos en el html haciendo uso del DOM
const imprimir = () => {
  // agrego todos los filtros de categorias que vienen en la api
  const filtros = document.querySelector(".filters");
  // recorro el array de categorias con un forEach
  categorias.forEach((cat) =>{
    filtros.innerHTML += `
    
    <button class="chip ${cat.id === 0 ? 'active' : ''}" role="tab" aria-selected="true">${cat.label}</button>
    
    `
  })

  const contenedor = document.getElementById("productos");

  servicios.forEach((prod) => {
    contenedor.innerHTML += `
     <article class="product" aria-labelledby="p1">
              <img src=${prod.imagen} alt=${prod.alt}>
              <div class="body">
              
                <div style="display:flex;justify-content:space-between;align-items:start">
                  <div>
                    <h4 id="p1" style="margin:0;font-size:16px;font-weight:700">${prod.nombre} </h4>
                    <div style="color:var(--muted);font-size:13px;margin-top:6px">${prod.descripcion}</div>
                  </div>
                  <div style="margin-left:8px"><span class="price-pill">Desde ${prod.precio}</span></div>
                </div>
    
                <div class="actions" style="margin-top:6px">
                  <button aria-label="Cotizar Impresión Simple Faz">Cotizar</button>
                </div>
              </div>
            </article>
    `;
  });
};
