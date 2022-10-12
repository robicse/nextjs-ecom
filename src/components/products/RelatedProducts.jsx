import { Box, Grid } from "@mui/material";
import ProductCard1 from "components/product-cards/ProductCard1";
import { H3 } from "components/Typography";
import React, {useEffect} from "react"; // ===================================================
import { useState } from "react";
const BASE_URL = process.env.BASE_URL

// ===================================================
const RelatedProducts = ({ productsData }) => {
  // console.log('productsData2222',productsData);

  // const itemChange = (item)=>{
  //   return{
  //     brand: item?.brand?.name,
  //     price: item.base_price || 0,
  //     title: item.name,
  //     imgUrl: `${BASE_URL}/public/${item.thumbnail_image}`,
  //     category: item.category?.name,
  //     unit: item?.unit,
  //     discount: item.discount,
  //     id: item.id,
  //     rating: 2,
  //     imgGroup: item.photos.map((img,index)=>`${BASE_URL}/public/${img}`),
  //     description: item?.description
  //   }
  // }

  return (
    <Box mb={7.5}>
      <H3 mb={3}>Realted Products</H3>
      <Grid container spacing={8}>
        {productsData.map(( item, ind) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
            <ProductCard1 
              id= {item.id}
              title={item.name}
              price = {item.base_price}
              imgUrl= {`${BASE_URL}/public/${item.thumbnail_image}`}
              rating= {2}
              brand = {item?.brand?.name}
              hoverEffect 
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedProducts;
