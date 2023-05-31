import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";

import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";


import axios from "axios";
import * as apiMethods from "../components/Apimethods.js";

import "../css/InicioSesion.sass";

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

const TextoClave = () => {

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const navigate = useNavigate();

      const onSubmit = (data) => {
        axios.post(apiMethods.AUTH_USUARIO, {username:data.username, password:data.password}).then(
            response => {
                const myString = response.data.username + ':' + response.data.password; // The string you want to convert to Base64
                const base64EncodedString = btoa(myString);
                window.sessionStorage.setItem('localToken', 'Basic ' + base64EncodedString);
                window.sessionStorage.setItem('localSesion', true);
                navigate("/");
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
                    paddingLeft: "45%",  // Adjust the padding value to center the component
                }}
                >
                <a href="/">LOGO PERRON</a>
            </Typography>

          </Toolbar>
        </AppBar>
        <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="login-title">INICIAR SESION</h2>
        <div className="login-input">
            <TextField
                className="login-input"
                label="Usuario"
                {...register("username", { required: "Nombre de usuario requerido" })}
                error={Boolean(errors.username)}
                helperText={errors.username && errors.username.message}
            />
        </div>
        
        <div className="login-input">
            <TextField
                className="login-input"
                label="Contraseña"
                type="password"
                {...register("password", { required: "Password is required" })}
                error={Boolean(errors.password)}
                helperText={errors.password && errors.password.message}
            />
        </div>
        
        <div className="login-submit-btn">
            <Button
                variant="contained"
                color="primary"
                type="submit"
            >
                Iniciar Sesion
            </Button>
        </div>
        <div className="register-link">
            <a href="/registrarse">Registrarse</a>
        </div>

        
      </form>
        </div>
    </>
  );
};

export default TextoClave;
