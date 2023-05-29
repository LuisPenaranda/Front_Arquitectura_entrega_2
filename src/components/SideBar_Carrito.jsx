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

const SideBar_Carrito = () => {

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
          <Box sx={{ width: '100%' }}>
            <Collapse orientation="horizontal" in={checked}>
              <div style={{backgroundColor:"Blue"}}>
                <lu>
                  <li>
                    <div>
                      <h1>asasas</h1>
                    </div>
                  </li>
                  <li>
                    <div>
                      <button>asasas</button>
                    </div>
                  </li>
                  <li>
                    <div>
                      <button>asasas</button>
                      <h1>asasas</h1>
                    </div>
                  </li>
                </lu>
                
                  
                
              </div>
            </Collapse>
          </Box>
        </div>
      </Box>
    </Box>
  );

}

export default SideBar_Carrito;