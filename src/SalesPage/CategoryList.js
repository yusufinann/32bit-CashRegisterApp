import React from 'react';
import { Card, CardMedia, CardContent } from '@mui/material';
import { useGlobalContext } from '../contexts/GlobalContext';

const CategoryList = () => {
  const { handleShowSubcategoryByCategoryId, state } = useGlobalContext();

  return (
    <div>
      <div className="card-container">
        {state.categories.map((category, index) => ( // index parametresini ekleyin
          <Card
            key={`${category.category_id}-${index}`} // Her bir kategori için benzersiz bir anahtar
            className="custom-card"
            onClick={() => handleShowSubcategoryByCategoryId(category.category_id)} 
          >
            <CardMedia
              component="img"
              alt={category.category_name}
              height="140"
              image={category.image_url}
            />
            <CardContent>
              <p>{category.category_name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
