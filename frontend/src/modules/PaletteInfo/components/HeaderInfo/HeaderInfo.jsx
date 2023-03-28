import PageTitle from "../../../../components/PageTitle/PageTitle.jsx";
import {IconButton, Typography} from "@mui/material";

import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import {observer} from "mobx-react-lite";
import useFavorite from "../../../../hooks/useFavorite.js";

const HeaderInfo = ({data}) => {
  const {date, owner, name, _id} = data
  const {favoriteList, handleToggleFavorite, store} = useFavorite()

  return (
    <>
      <PageTitle title={name} m={0}/>
      <Typography>Дата создания: {new Date(date).toLocaleDateString()}</Typography>
      <Typography>Добавил: {owner === 'host' ? 'Palette Picker' : owner}</Typography>
      {store.isAuth &&
        <IconButton
          sx={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}
          onClick={() => handleToggleFavorite(_id)}
        >
          {favoriteList.includes(_id)
            ? <StarRoundedIcon sx={{fontSize: 32}}/>
            : <StarBorderRoundedIcon sx={{fontSize: 32}}/>}
        </IconButton>}
    </>
  );
};

export default observer(HeaderInfo);