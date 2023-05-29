import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';

import "../css/NavBar.sass";

const icon = (
  <Paper sx={{ m: 1 }} elevation={4}>
    <Box component="svg" sx={{ width: 100, height: 100 }}>
      <Box
        component="polygon"
        sx={{
          fill: (theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
        points="0,100 50,00, 100,100"
      />
    </Box>
  </Paper>
);

const SideBar_Menu = () => {

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box sx={{ height: 300 }}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      />
      <Box
        sx={{
          '& > :not(style)': {
            display: 'flex',
            justifyContent: 'space-around',
            height: 120,
            width: 280,
          },
        }}
      >
        <div>
          <Box>
            <Collapse orientation="horizontal" in={checked}>
              <div>
                <div>
                  <a href='/'> MEREQUETENGE PERFIL</a>
                </div>
                <div>
                  <a href='/'> MEREQUETENGE CARRITO</a>
                </div>
                <div>
                  <a>CERRAR SESION</a>
                  <button>CerrarSesion</button>
                </div>
              </div>
            </Collapse>
          </Box>
        </div>
      </Box>
    </Box>
  );

}

export default SideBar_Menu;