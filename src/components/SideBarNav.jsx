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
import fantasy from "../images/Fantasy.jpg";
import deku from "../images/deku.gif";

import Carousel from "../components/ImageGallery";

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
  const[carrito,setCarrito] = useState([
    {text:'comida1', icon:<InboxIcon />, cantidad:1}
  ]);

  //esto se repite cada vez que cambia el tamaño de la imagen
  useEffect(() => {
    if(menu.length < 1){

      let productos = axios.get(apiMethods.GET_PRODUCTOS_ALL);
      console.log(productos);
      //Rellenar 
      var menu_prov = [
          { id: 1, src: fantasy, title: 'Image 1' },
          { id: 2, src: deku, title: 'Image 2' },
          { id: 3, src: fantasy, title: 'Image 1' },
          { id: 4, src: deku, title: 'Image 2' },
          { id: 5, src: fantasy, title: 'Image 1' },
          { id: 6, src: deku, title: 'Image 2' },
      ]
      setMenu(menu_prov)
    }
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    var carrito_prov = []
    var producto = [{text:'comida1', icon:<InboxIcon />, cantidad: 2},{text:'comida2', icon:<MailIcon />, cantidad: 2}]
    var cambiado = false;

    producto.map(producto_element => {
      carrito.map(element => {
        if(element.text == producto_element.text){
          var cantidadTotal = element.cantidad + producto_element.cantidad
          var row = {text:element.text, icon: element.icon, cantidad: cantidadTotal}
          carrito_prov.push(row)
          cambiado = true
        }
      })
      if(!cambiado){
        carrito_prov.push(producto_element)
      }
      cambiado = false
    })
    
    console.log(carrito_prov)
    setCarrito(carrito_prov)
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
                image={fantasy}
                alt="green iguana"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
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
            {menu.map((image) => (
                <Grid item xs={12} sm={6} md={4} key={image.id}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="200"
                        image={image.src}
                        alt="green iguana"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={handleAdd}>
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
