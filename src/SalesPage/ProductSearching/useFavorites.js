import { useState } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.find((fav) => fav.product_id === product.product_id)) {
        return prevFavorites.filter((fav) => fav.product_id !== product.product_id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  return [favorites, addToFavorites];
};

export default useFavorites;
