import {useEffect} from 'react'
import {Grid, Typography} from "@mui/material"
import {observer} from "mobx-react-lite";

import PaletteCard from "../PaletteCard/PaletteCard.jsx"
import {ErrorBlock, Loader} from "../UI";


const PalettesList = ({data, handleScrollPagination, error, isLoading, isLast, noDataMessage}) => {

  if (handleScrollPagination) {
    useEffect(() => {
      !isLast
        ? document.addEventListener('scroll', handleScrollPagination)
        : document.removeEventListener('scroll', handleScrollPagination)
      return () => document.removeEventListener('scroll', handleScrollPagination)
    }, [isLast])
  }


  return (
    <>

      {error && <ErrorBlock/>}

      {!noDataMessage
        ? <Grid container spacing={4} mt='-8px'>
          {data.map(palette =>
            <PaletteCard
              key={palette._id}
              palette={palette}
            />)}
        </Grid>
        : <Typography variant='h5' textAlign='center' mt={2}>{noDataMessage}</Typography>}

      <Loader isLoading={isLoading}/>

    </>
  );
};


export default observer(PalettesList);