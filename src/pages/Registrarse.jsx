import React, { useState } from 'react';
import FormularioRegistroUsuario from '../components/FormularioRegistroUsuario';

const Registrarse = () =>  {

  const [show,setShow] = useState('');

  const claveId  = "NombreUsuario"
  const claveHint = "Ingresa tu correo"
  const onClickFuncion = () =>{
    if(true){

    }
  }
//<TextoClave claveId={claveId} claveHint={claveHint} onClickFuncion={onClickFuncion}/>  
  return (
    <>  
         
        <FormularioRegistroUsuario/>

    </>
  );
}

export default Registrarse;