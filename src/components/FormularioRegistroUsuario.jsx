import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import "../css/Registrarse.sass";

const FormularioRegistroUsuario = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    navigate("/iniciarsesion");
  }; // your form submit function which will invoke after successful validation

  console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <>
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form onSubmit={handleSubmit(onSubmit)}>
        
            <div className="Registrarse-datos">
                {/* register your input into the hook by invoking the "register" function */}
                <input {...register("nombre")} />
            </div>
            
            <div className="Registrarse-datos">
                {/* include validation with required or other standard HTML validation rules */}
                <input {...register("apellido", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}
            </div>

            <div className="Registrarse-datos">
                {/* register your input into the hook by invoking the "register" function */}
                <input {...register("edad")} />
            </div>
            
            <div className="Registrarse-datos">
                {/* include validation with required or other standard HTML validation rules */}
                <input {...register("genero", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}
            </div>
        
            <input type="submit" value="Registrarse"/>

        </form>

    </>
  );
}

export default FormularioRegistroUsuario;