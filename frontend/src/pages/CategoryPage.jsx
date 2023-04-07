import {useEffect} from "react";
import {useParams} from "react-router-dom";
import PalettesList from "../components/PalettesList/PalettesList.jsx";
import {PageTitle} from "../components/UI";
import ButtonScrollTop from "../components/ButtonScrollTop/ButtonScrollTop.jsx";
import {useScrollToTop, useScrollPagination} from "../hooks";
import PaletteService from "../api/PaletteService.js";


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
  const {handleScrollFromTop, isButtonVisible} = useScrollToTop()

  const getData = async () => {
    return await PaletteService.getPaletteByCategory(category, skip, limit)
  }

  useEffect(() => {
    document.addEventListener('scroll', handleScrollFromTop)
    return () => document.removeEventListener('scroll', handleScrollFromTop)
  }, []);

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
      <ButtonScrollTop visible={isButtonVisible} />
    </>
  );
};

export default CategoryPage;