import React, { useState } from "react";
import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";

import "../css/InicioSesion.sass";

const TextoClave = (props) =>  {

    const {claveHint,claveId,onClickFuncion} = props 

    const regexEmail = "([\w-\.]+@([\w-]+\.)+[\w-]{2,4})|([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)"

    //const [email, setEmail] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate(); // useNavigate hook for navigation
    const onSubmit = data => {
        console.log(data)
        const encodedString = btoa(data.UserName + ':' + data.exampleRequired); 
        console.log(encodedString)//GUARDAR ESTO EN GLOBAL COMO TOKEN y CAMBIAR ESTADO A INICIADO
        //Autorizacion : Basic BASE64 => esto va en el header
        navigate('/'); 
    };
    //<form onSubmit={handleSubmit(onSubmit)}>

    /*const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${email}`)
    }*/

    return (
    <>
        <div id={"InicioSesion" + claveId}>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <div className="InicioSesionUsuario" style={{border:''}}>
                    <h2 for={claveId}>{claveHint}</h2>
                    <input  {...register("UserName", {pattern:{regexEmail}}, { required: true }) }/>
                    {errors.UserName && <span>This field is required</span>}

                    {/* register your input into the hook by invoking the "register" function */}
                    {
                    //<input defaultValue="test" {...register("example")} />
                    }
                </div>

                <div className="InicioSesionClave">
                    <h2 for={claveId + "l"}>{claveHint}</h2>
                    {/* include validation with required or other standard HTML validation rules */}
                    <input {...register("exampleRequired", { required: true })} />
                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && <span>This field is required</span>}
                </div>
                
                
                <div className="InicioSesionSubmit">
                    <input id={"Submit" + claveId} type='submit' value="🐈"></input>
                </div>
            
            </form>
            <a href='/registrarse'>doble merequetengue REGISTRO</a>
        </div>
    </>
  );
}

export default TextoClave;