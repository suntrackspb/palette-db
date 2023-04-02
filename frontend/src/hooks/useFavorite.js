import {useEffect, useState} from "react";
import useAuth from "./useAuth.js";
import PaletteService from "../api/PaletteService.js";

const useFavorite = () => {
  const {store} = useAuth()
  const [favoriteList, setFavoriteList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFavoriteList(Object.values(store.favorite))
  }, [store.favorite]);

  const handleToggleFavorite = id => {
    setLoading(true)
    PaletteService.addToFavorite({
      favorite: favoriteList.includes(id)
        ? favoriteList.filter(_id => id !== _id)
        : [...favoriteList, id]
    })
      .then(res => {
        setFavoriteList(res)
        store.setFavorite(res)
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false))
  }

  return {favoriteList, handleToggleFavorite, store, loading}
}

export default useFavorite