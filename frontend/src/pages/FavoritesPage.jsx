import React, {useEffect, useState} from 'react';
import PaletteService from "../API/PaletteService.js";
import PageTitle from "../components/PageTitle/PageTitle.jsx";
import PalettesList from "../components/PalettesList/PalettesList.jsx";
import useFetching from "../hooks/useFetching.js";
import {observer} from "mobx-react-lite";

const FavoritesPage = () => {
  const [data, setData] = useState([]);
  const [fetchData, isLoading, error, setLoading] = useFetching(async () => {
    return await PaletteService.getFavorites(localStorage.getItem('login'))
  })

  useEffect(() => {
    fetchData()
      .then(setData)
  }, []);

  return (
    <>
      <PageTitle title='Избранное' mb={0}/>
      <PalettesList
        data={data}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
};

export default FavoritesPage;