import {useEffect} from "react";
import PalettesList from "../components/PalettesList/PalettesList.jsx";
import ButtonScrollTop from "../components/ButtonScrollTop/ButtonScrollTop.jsx";
import {useScrollPagination, useScrollToTop} from "../hooks";
import PaletteService from "../api/PaletteService.js";

const PalettesPage = () => {
  const limit = 32
  const {
    data,
    skip,
    isLoading,
    error,
    isLast,
    handleScrollPagination
  } = useScrollPagination(() => getData(), 0, limit)
  const {handleScrollFromTop, isButtonVisible} = useScrollToTop()

  const getData = async () => {
    return await PaletteService.getPalettes(skip, limit)
  }

  useEffect(() => {
    document.addEventListener('scroll', handleScrollFromTop)
    return () => document.removeEventListener('scroll', handleScrollFromTop)
  }, []);

  return (
    <>
      <PalettesList
        data={data}
        handleScrollPagination={handleScrollPagination}
        isLoading={isLoading}
        error={error}
        isLast={isLast}
      />
      <ButtonScrollTop visible={isButtonVisible}/>
    </>
  );
};

export default PalettesPage;