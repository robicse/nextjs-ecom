import Person from "@mui/icons-material/Person";
import { Avatar, Box, Button, Card, Grid, Typography } from "@mui/material";
import { FlexBetween, FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import TableRow from "components/TableRow";
import { H3, H5, Small } from "components/Typography";
import { format } from "date-fns";
import Link from "next/link";
import imageUrlFormat from "utils/imageUrlFormat";
import useAuth from "hooks/useAuth";
import api from "utils/api/auth";
import shopApi from "utils/api/superstore-shop";
import { useState, useEffect } from "react";
 
const Profile = ({generalSetting}) => {
console.log(generalSetting )
  const { user, getCustomerDashboard}  = useAuth();
  
  console.log(user);
  
  const [customerDashboard, setCustomerDashboard] = useState({});
  const [editAddressfromOpen, setEditAddressfromOpen] = useState(false)
 

  const handleEditAddressForm =(data) => {
    setEditdata(data)
    setEditAddressfromOpen(!editAddressfromOpen)
  }


  // const editAddressSubmitHandle = async(value)=>{
  //   const res = await updateCustomerProfile(value);
  //   if(res){
  //     await getCustomerProfileFetch()
  //     handleEditAddressForm(null)
  //   }
  // }

  const getCustomerDashboardFetch = async()=>{
    const res = await getCustomerDashboard();
    setCustomerDashboard(res.response);
  };

    useEffect(()=>{
      getCustomerDashboardFetch();
    },[])


  return (
    <CustomerDashboardLayout generalSetting={generalSetting}>
      <UserDashboardHeader
        icon={Person}
        title="My Profile"
        navigation={<CustomerDashboardNavigation />}
        button={
          <Link href="/profile/edit" passHref>
            <Button
              color="primary"
              sx={{
                px: 4,
                bgcolor: "primary.light",
              }}
              
            >
              Edit Profile
            </Button>
          </Link>
        }
      />

      <Box mb={4}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Card
              sx={{
                display: "flex",
                p: "14px 32px",
                height: "100%",
                alignItems: "center",
              }}
            >
              <Avatar
               src={imageUrlFormat(user?.avatar_original)}
              
                // src="/assets/images/faces/ralph.png"
                sx={{
                  height: 64,
                  width: 64,
                }}
              />

              <Box ml={1.5} flex="1 1 0">
                <FlexBetween flexWrap="wrap">
                  <div>
                    <H5 my="0px">{user?.name}</H5>
                    <FlexBox alignItems="center">
                      <Typography color="grey.600">Balance:</Typography>
                      <Typography ml={0.5} color="primary.main">
                       ৳{customerDashboard?.balance}
                      </Typography>
                    </FlexBox>
                  </div>

                </FlexBetween>
              </Box>
            </Card>
          </Grid>

          <Grid item md={6} xs={12}>
            <Grid container spacing={4}>
              
                {/* <Grid item lg={3} sm={6} xs={6}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      p: "1rem 1.25rem",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <H3 color="primary.main" my={0} fontWeight={600}>
                      {customerDashboard?.cart_product}
                    </H3>

                    <Small color="grey.600" textAlign="center">
                    cart product
                    </Small>
                  </Card>
                </Grid> */}

                <Grid item lg={6} sm={6} xs={6} >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      p: "1rem 1.25rem",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <H3 color="primary.main" my={0} fontWeight={600}>
                      {customerDashboard?.wishlist_product}
                    </H3>

                    <Small color="grey.600" textAlign="center">
                    wishlist product
                    </Small>
                  </Card>
                </Grid>

                <Grid item lg={6} sm={6} xs={6} >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      p: "1rem 1.25rem",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <H3 color="primary.main" my={0} fontWeight={600}>
                      {customerDashboard?.order_product}
                    </H3>

                    <Small color="grey.600" textAlign="center">
                    order product
                    </Small>
                  </Card>
                </Grid>
             
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <TableRow
        sx={{
          p: "0.75rem 1.5rem",
        }}
      >
        <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5} textAlign="left">
             Name
          </Small>
          <span>{user?.name}</span>
        </FlexBox>

      

        {/* <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5} textAlign="left">
            Email
          </Small>
          <span>{user?.email}</span>
        </FlexBox> */}

        <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5} textAlign="left">
            Phone
          </Small>
          <span>{user?.phone}</span>
        </FlexBox>

        <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5} textAlign="left">
            Join At
          </Small>
          <span> {user?.created_at}</span>
        </FlexBox>
      </TableRow>

      
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
export default Profile;
