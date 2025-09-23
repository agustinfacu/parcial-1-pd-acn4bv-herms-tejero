// api para obtener informacion de servicios
const API_URL = "https://jsonblob.com/api/jsonBlob/1420033092164444160";
const servicios = [];

const cargarData = async () => {
  const response = await fetch(API_URL);
  if(response.status === 200) {
      const data = await response.json();
      servicios.push(...data.productos.servicios);
    imprimir();
  }
  console.log("data ", servicios);
  
};

cargarData();

//  <article class="product" aria-labelledby="p1">
//           <img src="https://images.unsplash.com/photo-1549388604-817d15aa0110?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=..." alt="Impresora industrial">
//           <div class="body">
//             <div style="display:flex;justify-content:space-between;align-items:start">
//               <div>
//                 <h4 id="p1" style="margin:0;font-size:16px;font-weight:700">Impresión Simple Faz</h4>
//                 <div style="color:var(--muted);font-size:13px;margin-top:6px">Copias en blanco y negro o color, cara simple</div>
//               </div>
//               <div style="margin-left:8px"><span class="price-pill">Desde $50</span></div>
//             </div>

//             <div class="actions" style="margin-top:6px">
//               <button aria-label="Cotizar Impresión Simple Faz">Cotizar</button>
//             </div>
//           </div>
//         </article>

const imprimir = () => {
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
