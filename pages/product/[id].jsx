import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import ShopLayout1 from "components/layouts/ShopLayout1";
import Navbar from "components/navbar/Navbar";
import ProductDescription from "components/products/ProductDescription";
import ProductIntro from "components/products/ProductIntro";
import ProductReview from "components/products/ProductReview";
import RelatedProducts from "components/products/RelatedProducts";
import { H2 } from "components/Typography";
import parse from 'html-react-parser';
import { useEffect, useState } from "react";
import {
  getFrequentlyBought,
} from "utils/api/related-products";
import api from "utils/api/superstore-shop";
const BASE_URL = process.env.BASE_URL

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 80,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize",
  },
})); // ===============================================================

// ===============================================================
const ProductDetails = (props) => {
  // console.log('come here')
  const itemChange = (item)=>{
    return{
      brand: item?.brand?.name,
      price: item?.unit_price || 0,
      title: item.name,
      imgUrl: `${BASE_URL}/public/${item.thumbnail_image}`,
      category: item.category?.name,
      unit: item?.unit,
      discount: item.discount,
      id: item.id,
      rating: 2,
      imgGroup: item.photos.map((img,index)=>`${BASE_URL}/public/${img}`),
      description: item?.description
    }
  }
  const {productDetails,reviewsProduct,relatedProducts, generalSetting} = props
  const product = itemChange(productDetails);
  // console.log('product',product)
  //  console.log('relatedProducts',relatedProducts)
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionClick = (_, value) => setSelectedOption(value);
  const title = product.title;
  const description = parse(product.description);

  return (
    <ShopLayout1 title={title} description={description} generalSetting={generalSetting} navbar={<Navbar />}>
      <Container
        sx={{
          my: 4,
        }}
      >
        {product ? <ProductIntro product={product} /> : <H2>Loading...</H2>}

        <StyledTabs
          textColor="primary"
          value={selectedOption}
          indicatorColor="primary"
          onChange={handleOptionClick}
        >
          <Tab className="inner-tab" label="Description" />
          <Tab className="inner-tab" label="Review (3)" />
        </StyledTabs>

        <Box mb={6}>
          {selectedOption === 0 && <ProductDescription product={product} />}
          {selectedOption === 1 && <ProductReview reviewsProduct={reviewsProduct} />}
        </Box>
        {relatedProducts && <RelatedProducts productsData={relatedProducts} />}
      </Container>
    </ShopLayout1>
  );
}; 


export  const getStaticPaths = async()=> {

  // const newArrivalProduct = await api.getNewArrivalProductList();
  const newArrivalProduct = await api.getAllProductList();
  const paths =newArrivalProduct.map((item)=>{
   return{
     params: {
       id: `${item.id}`
     }
   };
 });
 return {
   paths,
   fallback:false,
 }
}

export  const getStaticProps = async(context)=> {
  const generalSetting = await api.generalSetting();
  const { params } = context;
  const productDetails = await api.getProductDetailsById(params.id)
  const reviewsProduct = await api.getReviewsProduct(params.id);
  const relatedProducts = await api.getRelatedProductList(context.params.id);

 return {
   props: {
    generalSetting,
    productDetails,
    reviewsProduct,
    relatedProducts
   }
 }
}

export default ProductDetails;
