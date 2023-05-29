import React, { useState } from 'react';
import TextoClave from '../components/TextoClave';

const IniciarSesion = () =>  {

  const [show,setShow] = useState('');

  const claveId  = "NombreUsuario"
  const claveHint = "Ingresa tu correo"
  const onClickFuncion = () =>{
    if(true){

    }
  }

  return (
    <>  
        <TextoClave claveId={claveId} claveHint={claveHint} onClickFuncion={onClickFuncion}/>
    </>
  );
}

export default IniciarSesion;