import {CircularProgress, IconButton} from "@mui/material";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import {useFavorite} from "../../hooks";
import {observer} from "mobx-react-lite";


const ButtonFavorite = ({id, size}) => {
  const {favoriteList, handleToggleFavorite, loading} = useFavorite()
  return (
    <IconButton
      aria-label="Добавить в избранное"
      onClick={() => handleToggleFavorite(id)}
      disabled={loading}
    >
      {loading
        ? <CircularProgress size={size} color="inherit" />
        : favoriteList.includes(id)
          ? <StarRoundedIcon sx={{fontSize: size, color: '#e5ae13'}}/>
          : <StarBorderRoundedIcon sx={{fontSize: size}}/>}
    </IconButton>
  );
};

export default observer(ButtonFavorite);