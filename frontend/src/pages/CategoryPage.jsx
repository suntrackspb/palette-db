import {useParams} from "react-router-dom";
import useScrollPagination from "../hooks/useScrollPagination.js";
import PalettesList from "../components/PalettesList/PalettesList.jsx";
import {PageTitle} from "../components/UI";
import PaletteService from "../api/PaletteService.js";
import ButtonScrollTop from "../components/ButtonScrollTop/ButtonScrollTop.jsx";


const CategoryPage = () => {
  const {category} = useParams()
  const limit = 20
  const {
    data,
    skip,
    isLoading,
    error,
    isLast,
    handleScrollPagination
  } = useScrollPagination(() => getData(), 0, limit)

  const getData = async () => {
    return await PaletteService.getPaletteByCategory(category, skip, limit)
  }

  return (
    <>
      <PageTitle title={category} mb={0}/>
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

export default CategoryPage;