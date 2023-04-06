import {Suspense} from "react";
import {Await, useAsyncValue, useLoaderData} from "react-router-dom";
import {Container} from "@mui/material";


import PaletteInfo from "../modules/PaletteInfo/PaletteInfo";
import {ErrorBlock, Loader} from "../components/UI";

import PaletteService from "../api/PaletteService.js";

const PaletteContent = () => {
  const data = useAsyncValue()
  return <PaletteInfo data={data} />
}

const PalettePage = () => {
  const {palette} = useLoaderData()

  return (
    <Container maxWidth='lg' component='section'>
      <Suspense fallback={<Loader isLoading/>}>
        <Await resolve={palette} errorElement={<ErrorBlock/>}>
          <PaletteContent/>
        </Await>
      </Suspense>
    </Container>
  );
};

const paletteLoader = async ({params}) => {
  return {palette: PaletteService.getPaletteById(params.id)}
}
export {paletteLoader}
export default PalettePage;