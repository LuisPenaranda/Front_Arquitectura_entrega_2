import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Productos from '../components/Productos';
import SideBarNav from '../components/SideBarNav';

const Home = () =>  {

  const [show,setShow] = useState('');

  const claveId  = "NombreUsuario"
  const claveHint = "Ingresa tu correo"
  const onClickFuncion = () =>{
    if(true){

    }
  }


  //CAMBIAR LA PAGINA A UNA DE PAGO AL DARLE PAGAR (SINGLE PAGE MANEJA TRES COSAS PERFIL, CARRITO Y PAGO)
  return (
    <>    
      <SideBarNav/>
        
    </>
  );
}

export default Home;