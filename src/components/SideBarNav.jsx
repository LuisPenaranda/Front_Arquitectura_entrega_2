import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';

import axios from "axios";
import * as apiMethods from "../components/Apimethods.js";
import promociones from "../images/Promociones.png";

import emailjs from '@emailjs/browser';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideBarNav = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const[menu,setMenu] = useState([]);
  const[carrito,setCarrito] = useState([]);

  //esto se repite cada vez que cambia el tamaño de la imagen
  useEffect(() => {
    if(menu.length < 1){

      let productos = []
      var menu_prov = []

      axios.get(apiMethods.GET_PRODUCTOS_ALL)
        .then(response => {
          productos = response.data;
           // or do whatever you need with the data

          productos.map(e => {
            let row = {id: e.id, src: e.image, title:e.name, description: e.description, icon:<MailIcon />,cantidad:0, value:e.value}
            menu_prov.push(row)
          })
          setMenu(menu_prov)

          // Update the state or trigger other actions using the data

        })
        .catch(error => {
          // Handle any errors that occur during the request
          console.error('Error fetching products:', error);
        });
      
    }
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAdd = (element) => {
    var carrito_prov = carrito;
    var producto = {id: element.id,src:element.src ,text:element.title, description:element.description, icon:element.icon, value:element.value, cantidad: element.cantidad + 1}
    var remplazado = false

    carrito_prov.map(carrito_element => {
      if(carrito_element.text == producto.text){
        carrito_element.cantidad = carrito_element.cantidad + producto.cantidad
        remplazado = true
      }
    })
    
    if(!remplazado){
      var row = {id: producto.id,image:producto.src , text:producto.text, description:producto.description, value:producto.value, icon: producto.icon, cantidad: producto.cantidad}
      carrito_prov.push(row)
    }

    setCarrito(carrito_prov)
    
  }

  const handlePagos = () =>{
    axios.post(apiMethods.POST_ORDEN,
      {
        UserId: window.sessionStorage.getItem("IdSesion"),
        Address: "Carrera 6 # 4 - 44",
        UserName: window.sessionStorage.getItem("UsernameSesion"),
        Status: "PEDIDO",
        Products: [],
        Quantities: ""
      },
      {
        headers: {
          Authorization: window.sessionStorage.getItem("localToken"),
        },
      },
      
    ).then(response => {

      var a = ''
      var productos_comprados = []

      carrito.map(element =>{
        a = a + element.id + ',' + element.cantidad + ':';
        productos_comprados.push({
          "id": element.id,
          "name": element.text,
          "description": element.description,
          "value": element.value,
          "image": element.image,
        })
      })

      var jsonData = JSON.stringify(productos_comprados)

      console.log(jsonData)

      axios.put(apiMethods.PUT_ORDEN,
        {
          Id: response.data.value,
          UserId: parseInt(window.sessionStorage.getItem("IdSesion")),
          Address: "Carrera 6 # 4 - 44",
          UserName: window.sessionStorage.getItem("UsernameSesion"),
          Status: "PEDIDO",
          Products: productos_comprados,
          Quantities: a
        },
        {
          headers: {
            Authorization: window.sessionStorage.getItem("localToken"),
          },
        },
      ).then(e =>{
        
        const emailParams = {
          to_name:'santiago',
          to_email: 'srodri0715@gmail.com',
          subject: 'Tu recibo',
          message: 'Merequetengue'
        };

        emailjs.init('onyCXSYB7HMml3vGP')

        emailjs.send('service_dgqcw9e', 'template_ud7w9g7', emailParams)
          .then((response) => {
            console.log('Correo electrónico enviado:', response.text);
            // Aquí puedes agregar lógica adicional después de enviar el correo electrónico
          }, (error) => {
            console.error('Error al enviar el correo electrónico:', error.text);
            // Aquí puedes manejar los errores de envío del correo electrónico
          });
      })
      
    })
  }

  const handleMenuListItem = ( id ) =>{
    if(id == 0){

    }
    else if(id == 1){

    }
    else if(id == 2){
      window.sessionStorage.setItem('localToken', '');
      window.sessionStorage.setItem('localSesion', false);
      window.location.reload();
    }
  }

  return (
    <>
      <Box sx={{ display: "flex" }} >
        <AppBar position="fixed" open={open} >
          <Toolbar style={{backgroundColor:'#ffffff'}}>
            <IconButton
              color="#000000"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block", color: "#000000" },
              }}
            >
              MUI RESTAURANTE
            </Typography>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block", color: "#000000" },paddingLeft:"20%"
              }}
            >
              <a>LOGO PERRON</a>
            </Typography>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block", color: "#000000" }, paddingLeft:"30%"
              }}
            >
              <a href="/iniciarsesion">INGRESO DE SESION</a>
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {["Perfil", "Merequetengue 1", "Cerrar Sesion"].map(
              (text, index) => (
                <ListItem key={text} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => handleMenuListItem(index)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
          <Divider />
          <List>
            {["Carrito"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      flexGrow: 1,
                      display: { xs: "none", sm: "block", color: "#000000" },
                      opacity: open ? 1 : 0,
                    }}
                  >
                    CARRITO
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List>
            {carrito.map(element => (
              <ListItem key={element.text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {element.icon}
                  </ListItemIcon>
                  <ListItemText primary={element.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List>
            {["Pagar"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={handlePagos}
                >
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      flexGrow: 1,
                      display: { xs: "none", sm: "block", color: "#000000" },
                      opacity: open ? 1 : 0,
                    }}
                  >
                    Pagar
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{backgroundColor:'#ffffff'}}>
          <DrawerHeader />
          <Typography paragraph>
            <h3>MEREQUENTEGUE PROMOCIONES</h3>
            <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                image={promociones}
                alt="hamburguesa doble a mitad de precio"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Por una Especial te llevas una SUPER Especial   
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Por comprar una hamburguesa especial te llevas una super especial {'(solo en esta promoción en linea)'} APROVECHA
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    AGREGAR AL CARRITO
                </Button>
            </CardActions>
            </Card>
            
            <Divider />
            <h3>MEREQUENTEGUE PRODUCTOS</h3>
            <Grid container spacing={2}>
            {menu.map(element => (
                <Grid item xs={12} sm={6} md={4} key={element.id}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="200"
                        image={element.src}
                        alt="green iguana"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {element.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {element.description}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => handleAdd(element)}>
                            AGREGAR AL CARRITO
                        </Button>
                    </CardActions>
                    </Card>
                </Grid>
            ))}
            </Grid>
            <Divider />
            <h3>MEREQUENTEGUE PREFERENCIAS</h3>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default SideBarNav;
