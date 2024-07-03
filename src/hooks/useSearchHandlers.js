import { useCallback, useState } from "react";

const useSearchHandlers = (state, setState) => {
  const handleSearching = useCallback((query) => {
    const formattedQuery = query.trim().toLowerCase();
    const wantedProducts = state.products.filter((product) =>
      product.product_name.toLowerCase().startsWith(formattedQuery)
    );

    setState((prev) => ({
      ...prev,
      searchQuery: query,
      wantedProduct: wantedProducts,
    }));

    setShowAllProducts(false);
  }, [state.products, setState]);

  const handleChange = useCallback((event) => {
    handleSearching(event.target.value);
    console.log(event);
  }, [handleSearching]);

  const [showAllProducts, setShowAllProducts] = useState(true);

  return { handleChange, showAllProducts, setShowAllProducts };
};

export default useSearchHandlers;
