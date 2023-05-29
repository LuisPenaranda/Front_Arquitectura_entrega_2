import React, { useState, useEffect } from 'react'
import Rutas from "./components/Rutas"

function App() {

  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  })

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    })
    window.sessionStorage.setItem("width", window.innerWidth);
    window.sessionStorage.setItem("height", window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize)

    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [windowDimenion])

  return (
    <>
      <Rutas/>
    </>
  );
}

export default App;
