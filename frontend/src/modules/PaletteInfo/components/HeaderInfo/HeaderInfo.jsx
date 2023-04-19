import {observer} from "mobx-react-lite";
import {Box, Typography} from "@mui/material";
import {PageTitle} from "../../../../components/UI";
import ButtonFavorite from "../../../../components/ButtonFavorite/ButtonFavorite.jsx";
import {useAuth} from "../../../../hooks";

const HeaderInfo = ({data}) => {
  const {date, owner, name, _id} = data
  const {store} = useAuth()

  return (
    <>
      <PageTitle title={name} m={0}/>
      <Typography>Дата создания: {new Date(date).toLocaleDateString()}</Typography>
      <Typography>Добавил: {owner === 'host' ? 'Palettify' : owner}</Typography>
      {store.isAuth &&
        <Box sx={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}>
          <ButtonFavorite id={_id} size={32}/>
        </Box>}
    </>
  );
};

export default observer(HeaderInfo);