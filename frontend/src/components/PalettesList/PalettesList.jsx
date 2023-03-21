import React, {useEffect} from 'react'

import PaletteCard from "../PaletteCard/PaletteCard.jsx"
import ErrorBlock from "../ErrorBlock/ErrorBlock.jsx";
import Loader from "../Loader/Loader.jsx";

import {Container, Grid} from "@mui/material"

const PalettesList = ({data, handleScroll, error, isLoading, isLast}) => {

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

      {error &&
        <ErrorBlock/>
      }

      <Grid container spacing={4} padding='20px'>
        {data.map(palette =>
          <PaletteCard key={palette._id} palette={palette}/>)}
      </Grid>

      <Loader isLoading={isLoading}/>

    </Container>
  );
};


export default PalettesList;