import PalettesList from "../components/PalettesList/PalettesList.jsx";
import PaletteService from "../api/PaletteService.js";
import useScrollPagination from "../hooks/useScrollPagination.js";

const MainPage = () => {
  const limit = 20
  const {data, skip, isLoading, error, isLast, handleScroll} = useScrollPagination(
      () => getData(), 0, limit)

  const getData = async () => {
    return await PaletteService.getPalettes(skip, limit)
  }

  return (
    <>
      <PalettesList
        data={data}
        handleScroll={handleScroll}
        isLoading={isLoading}
        error={error}
        isLast={isLast}
      />
    </>
  );
};

export default MainPage;