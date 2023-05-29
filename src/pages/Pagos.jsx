import React, { useState } from 'react';

const Pagos = () =>  {

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
         
        <div>

            <div>
                Que se va a pagar??
            </div>

            <div>
                El costo de todo
            </div>

            <div>
                Metodo de pago
            </div>

            <div>
                Pagar - Mandar Correo - ETC
            </div>

        </div>

    </>
  );
}

export default Pagos;