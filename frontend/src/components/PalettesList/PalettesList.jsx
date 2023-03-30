import React, {useEffect} from 'react'

import PaletteCard from "../PaletteCard/PaletteCard.jsx"
import ErrorBlock from "../ErrorBlock/ErrorBlock.jsx";
import Loader from "../Loader/Loader.jsx";

import {Container, Grid, Typography} from "@mui/material"
import {observer} from "mobx-react-lite";
import useFavorite from "../../hooks/useFavorite.js";

const PalettesList = ({data, handleScroll, error, isLoading, isLast, noDataMessage}) => {
  const {favoriteList, handleToggleFavorite, store} = useFavorite()

  if (handleScroll) {
    useEffect(() => {
      !isLast
        ? document.addEventListener('scroll', handleScroll)
        : document.removeEventListener('scroll', handleScroll)
      return () => document.removeEventListener('scroll', handleScroll)
    }, [isLast])
  }


  return (
    <Container maxWidth={"xl"} component='section'>

      {error && <ErrorBlock/>}

      {!noDataMessage
        ? <Grid container spacing={4} padding='20px'>
          {data.map(palette =>
            <PaletteCard
              key={palette._id}
              palette={palette}
              favoriteList={favoriteList}
              handleToggleFavorite={handleToggleFavorite}
              store={store}
            />)}
        </Grid>
        : <Typography variant='h5' textAlign='center' mt={2}>{noDataMessage}</Typography>}

      <Loader isLoading={isLoading}/>

    </Container>
  );
};


export default observer(PalettesList);