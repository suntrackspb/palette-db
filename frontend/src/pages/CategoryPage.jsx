import PaletteService from "../api/PaletteService.js";
import useScrollPagination from "../hooks/useScrollPagination.js";
import PalettesList from "../components/PalettesList/PalettesList.jsx";
import {useParams} from "react-router-dom";
import PageTitle from "../components/PageTitle/PageTitle.jsx";


const CategoryPage = () => {
  const {category} = useParams()
  const limit = 20
  const {data, skip, isLoading, error, isLast, handleScroll} = useScrollPagination(
    () => getData(), 0, limit)

  const getData = async () => {
    return await PaletteService.getPaletteByCategory(category, skip, limit)
  }

  return (
    <>
      <PageTitle title={category} mb={0}/>
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

export default CategoryPage;