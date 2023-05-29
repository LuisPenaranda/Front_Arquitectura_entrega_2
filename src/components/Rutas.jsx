import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "../pages/Home"
import IniciarSesion from "../pages/IniciarSesion"
import Registrarse from "../pages/Registrarse"

const Rutas = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/IniciarSesion' element={<IniciarSesion/>}/>
          <Route path='/Registrarse' element={<Registrarse/>}/>
        </Routes>

      </Router>
    </> 
  );
}

export default Rutas;