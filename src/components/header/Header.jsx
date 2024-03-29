import { KeyboardArrowDown, PersonOutline } from "@mui/icons-material";
import { Badge, Box, Dialog, Drawer, styled } from "@mui/material";
import Container from "@mui/material/Container";
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios'
import Router from 'next/router'
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx";
import BazarButton from "components/BazarButton";
import Image from "components/BazarImage";
import CategoryMenu from "components/categories/CategoryMenu";
import { FlexBox } from "components/flex-box";
import Category from "components/icons/Category";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import MiniCart from "components/mini-cart/MiniCart";
import MobileMenu from "components/navbar/MobileMenu";
import GrocerySearchBox from "components/search-box/GrocerySearchBox";
import { useAppContext } from "contexts/AppContext";
import Link from "next/link";
import Login from "pages-sections/sessions/Login";
import { useState } from "react";
import { layoutConstant } from "utils/constants";
import SearchBox from "../search-box/SearchBox"; // styled component
import useAuth from "hooks/useAuth";
const BASE_URL = process.env.BASE_URL

export const HeaderWrapper = styled(Box)(({ theme }) => ({
  zIndex: 3,
  position: "relative",
  height: layoutConstant.headerHeight,
  transition: "height 250ms ease-in-out",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    height: layoutConstant.mobileHeaderHeight,
  },
})); // ==============================================================

// ==============================================================
const Header = ({ isFixed,generalSetting, className, searchBoxType = "type2" }) => {
  const theme = useTheme();
  const {logout, isAuthenticated, login, customerResistration, token, wishList} = useAuth()
  const { state } = useAppContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const downMd = useMediaQuery(theme.breakpoints.down(1150));

  const toggleDialog = () => setDialogOpen(!dialogOpen);

  const toggleSidenav = () => setSidenavOpen(!sidenavOpen);

   const logoutHandle = () =>{
    const result = logout()
    if(result){
      Router.push('/');
    }
   }

  return (
    <HeaderWrapper className={clsx(className)}>
      <Container
        sx={{
          gap: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FlexBox
          mr={2}
          minWidth="170px"
          alignItems="center"
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <Link href="/">
            <a>
              <Image
                height={28}
                mb={0.5}
                //src={`${BASE_URL}/public/${generalSetting?.logo}`}
                src={`https://bme.com.bd/public/uploads/logo/MRVmzUb8Z7OfwOSSpLJRf22lepdrh0doGFOyz2nh.png`}
                alt="logo"
              />
            </a>
          </Link>

          {isFixed && (
            <CategoryMenu>
              <FlexBox color="grey.600" alignItems="center" ml={2}>
                <BazarButton color="inherit">
                  <Category fontSize="small" color="inherit" />
                  <KeyboardArrowDown fontSize="small" color="inherit" />
                </BazarButton>
              </FlexBox>
            </CategoryMenu>
          )}
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          {searchBoxType === "type1" && <SearchBox />}
          {searchBoxType === "type2" && <GrocerySearchBox />}
        </FlexBox>

        <FlexBox
          alignItems="center"
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >

          {
            token ? (
              <Box onClick={logoutHandle}><LogoutIcon/></Box>
            ) :  ( <Box
              component={IconButton}
              p={1.25}
              bgcolor="grey.200"
              onClick={toggleDialog}
            >
              <PersonOutline />
            </Box>)
          }
         
          {
            token && (
              <Badge badgeContent={wishList?.length} color="primary">
              <Box
                ml={2.5}
                p={1.25}
                bgcolor="grey.200"
                component={IconButton}
                onClick={()=>Router.push('/wish-list')}
              >
                <FavoriteIcon sx={{color:"red"}}/>
              </Box>
            </Badge>
            )
          }
     

          <Badge badgeContent={state.cart.length} color="primary">
            <Box
              ml={2.5}
              p={1.25}
              bgcolor="grey.200"
              component={IconButton}
              onClick={toggleSidenav}
            >
              <ShoppingBagOutlined />
            </Box>
          </Badge>
        </FlexBox>

        <Dialog
          open={dialogOpen}
          fullWidth={isMobile}
          scroll="body"
          onClose={toggleDialog}
        >
          <Login />
        </Dialog>

        <Drawer open={sidenavOpen} anchor="right" onClose={toggleSidenav}>
          <MiniCart />
        </Drawer>

        {/* {
            token ? (
              <Box onClick={logoutHandle}><LogoutIcon/></Box>
            ) :  ( <Box
              component={IconButton}
              p={1.25}
              bgcolor="grey.200"
              onClick={toggleDialog}
            >
              <PersonOutline />
            </Box>)
          } */}

        {/* {downMd && <PersonOutline />} */}
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
