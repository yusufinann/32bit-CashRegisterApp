import React from 'react';
import { Card, CardMedia, CardContent } from '@mui/material';

const CategoryList = ({ categories }) => {
  return (
    <div>
      <div className="card-container">
        {categories.map((category, index) => ( // index parametresini ekleyin
          <Card
            key={`${category.category_id}-${index}`} // Her bir kategori için benzersiz bir anahtar
            className="custom-card"
            // onClick={() => handleShowProducts(category.category_id)} // Kategoriye tıklandığında ürünleri getir
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
