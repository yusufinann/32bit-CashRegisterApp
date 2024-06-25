export const getPageNumbers = (totalItems, itemsPerPage) => {
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  
  export const getCurrentProducts = (products, currentPage, productsPerPage) => {
    const indexOfLastProduct = (currentPage + 1) * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return products.slice(indexOfFirstProduct, indexOfLastProduct);
  };
  
  export const filterProductsByLetter = (products, letter) => {
    return products.filter((product) => product.product_name.startsWith(letter));
  };