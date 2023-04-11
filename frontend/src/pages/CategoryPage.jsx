import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import PalettesList from "../components/PalettesList/PalettesList.jsx";
import {PageTitle} from "../components/UI";
import ButtonScrollTop from "../components/ButtonScrollTop/ButtonScrollTop.jsx";
import {useScrollToTop} from "../hooks";
import PaletteService from "../api/PaletteService.js";
import {capitalizeFirstLetter} from "../utils/";


const CategoryPage = () => {
  const {category} = useParams()
  const limit = 20
  const [data, setData] = useState([])
  const [skip, setSkip] = useState(0)
  const [isLast, setIsLast] = useState(false)
  const [isLoading, setLoading] = useState(true);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [error, setError] = useState('');
  const {handleScrollFromTop, isButtonVisible} = useScrollToTop()

  useEffect(() => {
    if (isLoading) {
      PaletteService.getPaletteByCategory(category, skip, limit)
        .then(res => {
          setData(!isNewCategory ? [...data, ...res] : [...res])
          setSkip(prev => prev + limit)
          setIsLast(res.length < limit)
        })
        .catch(() => console.log())
        .finally(() => {
          setLoading(false)
          setIsNewCategory(false)
        })
    }
  }, [isLoading, isNewCategory])


  useEffect(() => {
    setIsNewCategory(true)
    setLoading(true)
    setSkip(0)
  }, [category]);

  const handleScrollPagination = (e) => {
    const
      target = e.target,
      scrollHeight = target.documentElement.scrollHeight,
      scrollTop = target.documentElement.scrollTop,
      innerHeight = window.innerHeight

    if (scrollHeight - (scrollTop + innerHeight) < 50) {
      setLoading(true)
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', handleScrollFromTop)
    return () => document.removeEventListener('scroll', handleScrollFromTop)
  }, []);

  return (
    <>
      <PageTitle title={capitalizeFirstLetter(category)} sx={{mb: 0}}/>
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