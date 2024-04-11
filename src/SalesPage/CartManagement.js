import React from 'react';
import { Grid } from "@mui/material";
import CartList from './CartList';
import TotalAmount from './TotalAmount';
import { useGlobalContext } from '../contexts/GlobalContext';

function CartManagement() {
    const { totalAmount } = useGlobalContext();
    return (
        <div>
            <Grid
                item
                xs={12} // Full width on small screens
                sm={12} // Four columns on medium screens and larger
                style={{
                    
                    height: "70vh", // Set to 80% of the viewport height
                    overflow: "auto",
                    backgroundColor: "yellow",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius:20,
                    width: "100%", // Full width
                    marginTop:"auto"
                }}
            >
                <CartList /> 
            </Grid>

            <TotalAmount totalAmount={totalAmount} />      
        </div>
    );
}

export default CartManagement;
