import React from 'react';
import './styles.css';
import { useGlobalContext } from '../contexts/GlobalContext';
import { Card, CardMedia, CardContent } from '@mui/material';


const SubcategoryList = () => {
  const {state } = useGlobalContext();
  
 
  return (
     <div>
     <div className="card-container">
       {state.subcategories.map((subcategory) => (
         <Card
           key={subcategory.id} // Kategori verisinin benzersiz bir kimliği olduğunu varsayarak 'id' alanını anahtar olarak kullanıyoruz
           className="custom-card"
         >
           <CardMedia
             component="img"
            // alt={subcategory.name}
             height="140"
           //  image={subcategory.image_url}
           />
           <CardContent>
             <p>{subcategory.name}</p>
           </CardContent>
         </Card>
       ))}
     </div>
   </div>
  );
};

export default SubcategoryList;
