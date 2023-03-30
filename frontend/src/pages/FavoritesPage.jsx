import React, {useEffect, useState} from 'react';
import PaletteService from "../api/PaletteService.js";
import PageTitle from "../components/PageTitle/PageTitle.jsx";
import PalettesList from "../components/PalettesList/PalettesList.jsx";
import useFetching from "../hooks/useFetching.js";
import useAuth from "../hooks/useAuth.js";
import {observer} from "mobx-react-lite";

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
  }, [store.favorite]);

  return (
    <>
      <PageTitle title='Избранное' mb={0}/>
      <PalettesList
        data={data}
        isLoading={isLoading}
        error={error}
        noDataMessage={noDataMessage}
      />
    </>
  );
};

export default observer(FavoritesPage);