import React, { useState } from 'react';
import GlobalCardList from '../GlobalComponents/GlobalCardList';
import { useCartContext } from '../contexts/CartContext';

const FavoritesList = ({ favorites, handleFavorites }) => {
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
      <button key={i} onClick={() => setCurrentPage(i)} style={currentPage === i ? styles.activePage : styles.pageNumber}>
        {i}
      </button>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Favorites</h1>
      {/* GlobalCardList bileşenine favoriteIds prop'unu geçir */}
      <GlobalCardList
        array={currentItems}
        AddToCartFunction={handleAddToCart}
        handleFavorites={(event, product) => handleFavorites(event, product)}
        favoriteIds={favoriteIds}
      />
      {/* Sayfalama düğmeleri */}
      <div style={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        {pageNumbers}
        <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

// Stil nesneleri
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#333',
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  pageNumber: {
    margin: '0 5px',
    padding: '5px 10px',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    color: '#333',
    fontSize: '16px',
  },
  activePage: {
    margin: '0 5px',
    padding: '5px 10px',
    cursor: 'pointer',
    border: 'none',
    background: '#007bff',
    color: '#fff',
    fontSize: '16px',
    borderRadius: '5px',
  },
};

export default FavoritesList;
