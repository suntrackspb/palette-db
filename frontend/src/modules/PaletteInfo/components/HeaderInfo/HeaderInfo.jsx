import PageTitle from "../../../../components/PageTitle/PageTitle.jsx";
import {IconButton, Typography} from "@mui/material";

import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import {memo} from "react";

const HeaderInfo = memo(({data}) => {
  const {date, owner, name} = data
  return (
    <>
      <PageTitle title={name} m={0}/>
      <Typography>Дата создания: {new Date(date).toLocaleDateString()}</Typography>
      <Typography>Добавил: {owner === 'host' ? 'Palette Picker' : owner}</Typography>
      <IconButton aria-label="Добавить в избранное" sx={{
        position: 'absolute',
        top: 20,
        right: 20,
      }}>
        <StarBorderRoundedIcon sx={{fontSize: 32}} />
      </IconButton>

    </>
  );
});

export default HeaderInfo;