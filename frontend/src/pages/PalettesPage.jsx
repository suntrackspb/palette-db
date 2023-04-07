import useScrollPagination from "../hooks/useScrollPagination.js";
import PaletteService from "../api/PaletteService.js";
import PalettesList from "../components/PalettesList/PalettesList.jsx";
import ButtonScrollTop from "../components/ButtonScrollTop/ButtonScrollTop.jsx";

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

  const getData = async () => {
    return await PaletteService.getPalettes(skip, limit)
  }

  return (
    <>
      <PalettesList
        data={data}
        handleScrollPagination={handleScrollPagination}
        isLoading={isLoading}
        error={error}
        isLast={isLast}
      />
      <ButtonScrollTop />
    </>
  );
};

export default PalettesPage;