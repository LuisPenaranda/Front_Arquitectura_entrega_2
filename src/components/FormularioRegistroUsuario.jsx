import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import "../css/Registrarse.sass";

import axios from "axios";
import * as apiMethods from "../components/Apimethods.js";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const FormularioRegistroUsuario = () => {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    //navigate("/iniciarsesion");
    /*
    {
        headers: {
          Authorization: 'Basic UXVhZ21pcmU6MTIzNDU2',
        },
      } 
    */
   console.log(apiMethods.POST_USUARIO)
    axios.post(
      apiMethods.POST_USUARIO,
      {
        Username: data.Username,
        Password: data.Password,
        FirstName: data.FirstName,
        LastName: data.LastName,
        Email:data.Email,
        IdNumber:data.IdNumber,
        Preferences: []
      }
      ).then(
        response => 
        {
            console.log(response.data)
        }
      )
  };

  return (
    <>
      <AppBar position="fixed" open={open} >
          <Toolbar style={{backgroundColor:'#ffffff'}}>
          
          <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                    flexGrow: 1,
                    display: { xs: "none", sm: "block", color: "#000000" },
                    paddingLeft: "0%",  // Adjust the padding value to center the component
                }}
                >
                <a href="/iniciarsesion">INICIAR SESION</a>
            </Typography>

            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                    flexGrow: 1,
                    display: { xs: "none", sm: "block", color: "#000000" },
                    paddingRight: "10%",  // Adjust the padding value to center the component
                }}
                >
                <a href="/">LOGO PERRON</a>
            </Typography>

          </Toolbar>
        </AppBar>
      <div className="outside-box">
        <div className="gray-box">
          <div className="center-box">
            <form onSubmit={handleSubmit(onSubmit)} className="Registrarse-form">
              <div className="Registrarse-datos">
                <h2 className="Registry-title">REGISTRO</h2>
                <TextField
                  label="Nombre de usuario"
                  {...register("Username", { required: "Este campo es obligatorio" })}
                  error={Boolean(errors.Username)}
                  helperText={errors.Username && errors.Username.message}
                />
              </div>

              <div className="Registrarse-datos">
                <TextField
                  label="Contraseña"
                  {...register("Password", { required: "Este campo es obligatorio" })}
                  error={Boolean(errors.Password)}
                  helperText={errors.Password && errors.Password.message}
                />
              </div>

              <div className="Registrarse-datos">
                <TextField
                  label="Contraseña"
                  {...register("Password_validation", { required: "Este campo es obligatorio" })}
                  error={Boolean(errors.Password_validation)}
                  helperText={errors.Password_validation && errors.Password_validation.message}
                />
              </div>

              <div className="Registrarse-datos">
                <TextField
                  label="Nombres"
                  {...register("FirstName", { required: "Este campo es obligatorio" })}
                  error={Boolean(errors.FirstName)}
                  helperText={errors.FirstName && errors.FirstName.message}
                />
              </div>

              <div className="Registrarse-datos">
                <TextField
                  label="Apellidos"
                  {...register("LastName", { required: "Este campo es obligatorio" })}
                  error={Boolean(errors.LastName)}
                  helperText={errors.LastName && errors.LastName.message}
                />
              </div>

              <div className="Registrarse-datos">
                <TextField
                  label="Correo"
                  {...register("Email", { required: "Este campo es obligatorio" })}
                  error={Boolean(errors.Email)}
                  helperText={errors.Email && errors.Email.message}
                />
              </div>

              <div className="Registrarse-datos">
                <TextField
                  label="Cedula"
                  {...register("IdNumber", { required: "Este campo es obligatorio" })}
                  error={Boolean(errors.IdNumber)}
                  helperText={errors.IdNumber && errors.IdNumber.message}
                />
              </div>

              <Button type="submit" variant="contained" color="primary">
                Registrarse
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
    
  );
};

export default FormularioRegistroUsuario;
