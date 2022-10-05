import Favorite from "@mui/icons-material/Favorite";

import { Button, Grid, Pagination, Typography } from "@mui/material";
import { FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import ProductCard1 from "components/product-cards/ProductCard1";
import useAuth from "hooks/useAuth";
import imageUrlFormat from "utils/imageUrlFormat";
import shopApi from "utils/api/superstore-shop";
import React, { useEffect, useState } from "react";

const WishList = ({ generalSetting }) => {
  const { wishList } = useAuth();

  // const [wishListData, setWishlistData] = React.useState([]);
  // const [page, setPage] = React.useState(0);
  // const [count, setCount] = React.useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(3);
  const indexOfLastRecord = currentPage * recordsPerPage;
   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
   console.log(indexOfFirstRecord ,indexOfLastRecord ,'index')
 console.log(wishList, 'list')
  const currentRecords = wishList.slice(indexOfFirstRecord, 
  indexOfLastRecord);
  console.log(currentRecords, 'current')
  const nPages = Math.ceil(wishList.length / recordsPerPage)
   console.log(nPages, 'page')
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  
//   const nextPage = () => {
//     if(currentPage !== nPages) 
//         setCurrentPage(currentPage + 1)
// }
// const prevPage = () => {
//     if(currentPage !== 1) 
//         setCurrentPage(currentPage - 1)
// }

  const itemChange = (item) => {
    return {
      id: item.id,
      title: item.name,
      price: item.base_price,
      imgUrl: imageUrlFormat(item.thumbnail_image),
      rating: item.rating,
      discount: item.discount,
    };
  };

  // useEffect(()=>{
  //   setWishlistData(wishList)
  // },[page])


  return (
    <CustomerDashboardLayout generalSetting={generalSetting}>
      <UserDashboardHeader
        icon={Favorite}
        title="My Wish List"
        navigation={<CustomerDashboardNavigation />}
      />

      {!wishList?.length ? (
        <Typography textAlign="center" mt={10}>
          Wishlist Not Found
        </Typography>
      ) : (
        <div>
          <Grid container spacing={3}>
            {currentRecords.map((item) => (
              <Grid item lg={4} sm={6} xs={12} key={item.id}>
                <ProductCard1 hoverEffect {...itemChange(item.product)} />
              </Grid>
            ))}
          </Grid>

       <FlexBox justifyContent="center" mt={5}>
          <Pagination
          page={currentPage}
          color="primary"
          variant="outlined"
          count={nPages}
          onChange={handleChangePage}
        />
          </FlexBox> 
        </div>
      )}
    </CustomerDashboardLayout>
  );
};
export async function getStaticProps() {
  const generalSetting = await shopApi.generalSetting();
  return {
    props: {
      generalSetting,
    },
  };
}
export default WishList;
