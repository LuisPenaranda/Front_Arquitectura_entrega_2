import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button, CardActionArea, CardActions } from '@mui/material';

import fantasy from '../images/deku.gif'

const useStyles = makeStyles((theme) => ({
    
  card: {
    display: 'flex',
    flexDirection: 'column',
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9 aspect ratio
  },
  content: {
    flexGrow: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  favoriteIcon: {
  },
}));

const imageData = [
  { id: 1, src: fantasy, title: 'Image 1' },
  { id: 2, src: fantasy, title: 'Image 2' },
  { id: 3, src: fantasy, title: 'Image 1' },
  { id: 4, src: fantasy, title: 'Image 2' },
  { id: 5, src: fantasy, title: 'Image 1' },
  { id: 6, src: fantasy, title: 'Image 2' },
];

function ImageGallery() {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {imageData.map((image) => (
        <Grid item xs={12} sm={6} md={4} key={image.id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="200"
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
        </Grid>
      ))}
    </Grid>
  );
}

export default ImageGallery;
