import ShopLayout1 from "components/layouts/ShopLayout1";
import Navbar from "components/navbar/Navbar";
import { useRouter } from 'next/router';
import Section1 from "pages-sections/superstore-shop/Section1";
// import Section5 from "pages-sections/superstore-shop/Section5";
// import SellerListSection from "pages-sections/superstore-shop/sellerListSection";
// import Section10 from "pages-sections/superstore-shop/Section10";
// import Section12 from "pages-sections/superstore-shop/Section12";
//import Section14 from "pages-sections/superstore-shop/Section14";
import NewArrivalsProductList from "pages-sections/superstore-shop/newArrivalsProductList";
import FeaturedProductList from "pages-sections/superstore-shop/featuredProductList";
import CategoryProductList from "pages-sections/superstore-shop/categoryProductList";


import CategorySectionCreator from "components/CategorySectionCreator";
import GiftBox from "components/icons/GiftBox";


import api from "utils/api/superstore-shop";

const IndexPage = (props) => {
  const {
    generalSetting,
    // moreItems,
    // serviceList,
    topCategories,
    // newArrivalsList,
    newArrivalsProductList,
    featuredProductList,
    categoryProductList,
    mainCarouselData,
    // bottomCategories,
    // bestSellerProducts,
    // sellerList
  } = props;

  const { asPath, pathname } = useRouter();
  // console.log(pathname)
  const defaulCategoryShow = pathname == '/' ? true : false
  // console.log('categoryProductList',categoryProductList)
  const title = 'BME - Computer, Printer, Telecom & Security Devices Retailer in Bangladesh.';

  return (
    <ShopLayout1 title={title} generalSetting={generalSetting}>
      <Navbar navListOpen={defaulCategoryShow} topCategories={topCategories}/>
      <Section1 carouselData={mainCarouselData}/>
      {/* <Section5 newArrivalsList={newArrivalsList} /> */}
      <NewArrivalsProductList newArrivalsProductList={newArrivalsProductList} />
      <FeaturedProductList featuredProductList={featuredProductList} />

      {categoryProductList.map((item, index) => (
        <CategorySectionCreator
          icon=""
          title={item.name}
          seeMoreLink="#"
        >
          <CategoryProductList categoryProductList={categoryProductList[index].product} />
        </CategorySectionCreator>
      ))}



      {/* <Section14 bestSellerProducts={bestSellerProducts} /> */}
      {/* <Section10 categories={bottomCategories} />
      <SellerListSection  sellerList={sellerList}/>
      <Section12 serviceList={serviceList} /> */}
    </ShopLayout1>
  );
};

export async function getStaticProps() {
  const generalSetting = await api.generalSetting();
  // const sellerList = await api.getSellerList();
  // const moreItems = await api.getMoreItems();
  // const serviceList = await api.getServiceList();
  // const bottomCategories = await api.getCategories();
  const topCategories = await api.getTopCategories();
  const mainCarouselData = await api.getMainCarousel();
  const newArrivalsProductList = await api.getNewArrivalProductList();
  const featuredProductList = await api.getFeaturedProductList();
  const categoryProductList = await api.getCategoryProductList();
  
  // const bestSellerProducts = await api.getBestSellerProductList();

  return {
    props: {
      generalSetting,
      // sellerList,
      // moreItems,
      // serviceList,
      topCategories,
      newArrivalsProductList,
      featuredProductList,
      categoryProductList,
      mainCarouselData,
      // bottomCategories,
      // bestSellerProducts
    },
  };
}
export default IndexPage;
