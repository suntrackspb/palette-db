import {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import PalettesList from "../components/PalettesList/PalettesList.jsx";
import {PageTitle} from "../components/UI";
import useFetching from "../hooks/useFetching.js";
import useAuth from "../hooks/useAuth.js";
import PaletteService from "../api/PaletteService.js";

const FavoritesPage = () => {
  const {store} = useAuth()
  const [data, setData] = useState([]);
  const {fetchData, isLoading, error, noDataMessage, setNoDataMessage} = useFetching(async () => {
    return await PaletteService.getFavorites(localStorage.getItem('login'))
  })

  useEffect(() => {
    fetchData()
      .then(res => {
        setData(res)
        !res.length && setNoDataMessage('Список пуст')
      })
  }, []);

  useEffect(() => {
    setData(data.filter(item => store.favorite.includes(item._id)))
    !store.favorite.length && setNoDataMessage('Список пуст')
  }, [store.favorite]);

  return (
    <>
      <PageTitle title='Избранное' mb={0}/>
      <PalettesList
        data={data}
        isLoading={isLoading}
        error={error}
        noDataMessage={!data.length && noDataMessage}
      />
    </>
  );
};

export default observer(FavoritesPage);