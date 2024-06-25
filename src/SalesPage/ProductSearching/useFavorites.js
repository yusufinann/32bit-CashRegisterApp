// useFavorites.js (Custom Hooks Özel hook'lar kullanarak durumu ve yan etkileri yönetelim.)
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { setState } = useGlobalContext();

  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.find((fav) => fav.product_id === product.product_id)) {
        return prevFavorites.filter((fav) => fav.product_id !== product.product_id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  useEffect(() => {
    const favoriteIds = favorites.map((fav) => fav.product_id);
    setState((prevState) => ({
      ...prevState,
      favoriteIds: favoriteIds,
    }));
  }, [favorites, setState]);

  return [favorites, addToFavorites];
};

export default useFavorites;
