import React, { useState } from 'react';
import GlobalCardList from '../GlobalComponents/GlobalCardList/GlobalCardList';
import { useCartContext } from '../contexts/CartContext';
import './styles.css'; // Import the CSS file

const FavoritesList = ({ favorites, handleFavorites, theme }) => {
  const { handleAddToCart } = useCartContext();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(favorites.length / itemsPerPage);

  // Mevcut sayfadaki favori ürünleri al
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = favorites.slice(indexOfFirstItem, indexOfLastItem);
  const favoriteIds = favorites.map((favorite) => favorite.product_id);

  // Sayfa değiştiren fonksiyonlar
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Sayfa numaralarını oluştur
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={currentPage === i ? 'activePage' : 'pageNumber'}
      >
        {i}
      </button>
    );
  }

  return (
    <div className={`container ${theme}`}>
      <h1 className={`title ${theme}`}>Favorites</h1>
      {/* GlobalCardList bileşenine favoriteIds prop'unu geçir */}
      <GlobalCardList
        array={currentItems}
        AddToCartFunction={handleAddToCart}
        handleFavorites={(event, product) => handleFavorites(event, product)}
        favoriteIds={favoriteIds}
      />
      {/* Sayfalama düğmeleri */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        {pageNumbers}
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FavoritesList;
