import React, { useState, useEffect }  from "react";
import Pagos from '../pages/Pagos';

import axios from "axios";
import * as apiMethods from '../components/Apimethods.js'

import "../css/Productos.sass";

const Productos = () => {

  /*
          <SideBar_Carrito/>
        <SideBar_Menu/>
   */

  useEffect(() => {
    let productos =  axios.get(apiMethods.GET_PRODUCTOS_ALL)
    console.log(productos)
  })

  
    //CUANDO EXISTA TOKEN
    /*,{
      headers:{
        Authorization: token,
      },
    }*/

  const render_productos = () =>{

    return (
      <>    
          
      </>
    );
  };

  return (
    <>
      {}
      <div className="org_navbar">

        <div className="productos_grid">
          <div className="promociones">
            PROMOCIONES - Menu del dia {"(solo hoy)"} - etc
            <div>
              
              <div className="imagen_promocion">
                <img></img>
              </div>

              <div className="imagen_promocion">

              </div>

              <a> imagen </a>
              <a> nombre </a>
              <a> Hora estimada de entrega </a>
              <a> Costo de envio</a>
            
            </div>
          </div>
          <div className="productos">
            PRODUCTOS
            <div>
              <a> imagen </a>
              <a> nombre </a>
              <a> Hora estimada de entrega </a>
              <a> Costo de envio</a>
            </div>
          </div>
          <div className="preferencias">
            PREFERENCIAS {"(Puntos de Estilo)"}
            <div>
              <a> nombre </a>
              <a> Hora estimada de entrega </a>
              <a> Costo de envio</a>
            </div>
          </div>
        </div>

      </div>
      <div>
        <Pagos/>
      </div>
    </>
  );
}

export default Productos;