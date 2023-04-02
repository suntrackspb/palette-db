import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Grid,
  Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import useAuth from "../../hooks/useAuth.js";
import ButtonFavorite from "../ButtonFavorite/ButtonFavorite.jsx";

const PaletteCard = ({palette}) => {
  const {store} = useAuth()

  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Card sx={{bgcolor: 'common.first', backgroundImage: 'none'}}>
        <CardActions className='flex-sb' sx={{p: 2}}>
          <Typography variant='h6' sx={{textTransform: 'capitalize', ml: 1}}>
            {palette.name}
          </Typography>

          {store.isAuth && <ButtonFavorite id={palette._id} size={24}/>}
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