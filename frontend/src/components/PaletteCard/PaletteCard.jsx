import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import useAuth from "../../hooks/useAuth.js";
import {observer} from "mobx-react-lite";
import PaletteService from '../../api/PaletteService.js'

const PaletteCard = ({palette}) => {
  const {store} = useAuth()

  const handleAddFavorite = () => {
    PaletteService.addToFavorite({favorite: [palette._id]})
      .then(res => console.log(res))
  }

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
              onClick={handleAddFavorite}
            >
              <StarBorderRoundedIcon sx={{fontSize: 24}}/>
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