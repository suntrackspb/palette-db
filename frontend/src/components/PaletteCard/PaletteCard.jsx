import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia, CircularProgress,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import {observer} from "mobx-react-lite";
import useFavorite from "../../hooks/useFavorite.js";
import {useState} from "react";

const PaletteCard = ({palette}) => {
  const {favoriteList, handleToggleFavorite, store, loading} = useFavorite()

  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Card sx={{bgcolor: 'common.first', backgroundImage: 'none'}}>
        <CardActions className='flex-sb' sx={{p: 2}}>
          <Typography variant='h6' sx={{textTransform: 'capitalize', ml: 1}}>
            {palette.name}
          </Typography>

          {store.isAuth &&
            <IconButton
              aria-label="Добавить в избранное"
              onClick={() => handleToggleFavorite(palette._id)}
              disabled={loading}
            >
              {loading
                ? <CircularProgress size={24} color="inherit" />
                : favoriteList.includes(palette._id)
                  ? <StarRoundedIcon sx={{fontSize: 24}}/>
                  : <StarBorderRoundedIcon sx={{fontSize: 24}}/>}
            </IconButton>}
        </CardActions>

        <Link to={`/palette/${palette._id}`}>
          <CardActionArea>
            <CardMedia
              component='img'
              height='100%'
              image={palette.src}
            />
          </CardActionArea>
        </Link>
      </Card>
    </Grid>
  );
};

export default observer(PaletteCard);