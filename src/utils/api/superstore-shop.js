import axios from "axios";
const BASE_URL = process.env.BASE_URL
import asyncHandle from '../asyncHandle'

//done
const generalSetting = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/version1/general-settings`);
    //return response.data?.data[0];
    //return JSON.parse(response.data?.data[0]);
    return response.data?.data[0] || null;
  } catch (error) {
    console.log(error)
  }

};
//done
const getMainCarousel = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/version1/sliders`);
    return response.data?.data;
  } catch (error) {
    console.log(error)
  }
};

// done
const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/version1/all-categories`);
    return response.data?.data;
  } catch (error) {
    console.log(error)
  }
};

// done
const getCategoryProductList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/version1/all-categories-products`);
    return response.data?.data;
  } catch (error) {
    console.log(error)
  }
};

//done
const getBestSellerProductList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/version1/products/best-seller`);
    return response.data?.data;
  } catch (error) {
    console.log(error)
  }


}; 

// done
const getFlashDeals = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/version1/products/flash-deal`);
    return response.data?.data?.products?.data
  } catch (error) {
    return []
  }
 
};

// done
const getSellerList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/version1/shops`);
    return response.data?.data
  } catch (error) {
    return []
  }
 
};

const getTopRatedProduct = async () => {
  const response = await axios.get("/api/super-store/toprated-product");
  return response.data;
};

const getTopRatedBrand = async () => {
  const response = await axios.get("/api/super-store/toprated-brand");
  return response.data;
};

//done
const getAllProductList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/version1/products/all`);
   // console.log(response)
    return response.data?.data
  } catch (error) {
    return []
  }
};

//done
const getNewArrivalProductList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/version1/products/new-arrival`);
   // console.log(response)
    return response.data?.data
  } catch (error) {
    return []
  }
};

//done
const getFeaturedProductList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/version1/products/featured`);
   // console.log(response)
    return response.data?.data
  } catch (error) {
    return []
  }
};

//done
const getRelatedProductList = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/version1/products/related/${id}`);
   // console.log(response)
    return response.data?.data
  } catch (error) {
    return []
  }
};

//done
const getReviewsProduct = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/version1/reviews/product/${id}`);
   // console.log(response)
    return response.data?.data
  } catch (error) {
    return []
  }
};

// done
const getProductDetailsById = async (id) => {
  try {
     const response = await axios.get(`${BASE_URL}/api/version1/products/${id}`);
     return response?.data?.data[0]
  } catch (error) {
    return []
  
  }
};

const getCarBrands = async () => {
  const response = await axios.get("/api/super-store/car-brand-list");
  return response.data;
};

const getCarList = async () => {
  const response = await axios.get("/api/super-store/car-list");
  return response.data;
};

const getMobileBrands = async () => {
  const response = await axios.get("/api/super-store/mobile-brand-list");
  return response.data;
};

const getMobileShops = async () => {
  const response = await axios.get("/api/super-store/mobile-shop-list");
  return response.data;
};

const getMobileList = async () => {
  const response = await axios.get("/api/super-store/mobile-list");
  return response.data;
};

const getOpticsBrands = async () => {
  const response = await axios.get("/api/super-store/optics/watch-brands");
  return response.data;
};

const getOpticsShops = async () => {
  const response = await axios.get("/api/super-store/optics/watch-shops");
  return response.data;
};

const getOpticsList = async () => {
  const response = await axios.get("/api/super-store/optics-list");
  return response.data;
};



const getMoreItems = async () => {
  const response = await axios.get("/api/super-store/get-more-items");
  return response.data;
};

const getServiceList = async () => {
  const response = await axios.get("/api/super-store/get-service-list");
  return response.data;
};




const getTopCategories = async () => {
  // const getTopCategories = async () => {
  //   const response = await axios.get("/api/super-store/top-categories");
  //   return response.data;
  // };
  
  try {
    const response = await axios.get(`${BASE_URL}/api/version1/categories`);
 
   //  console.log(result, 'category')
    return response?.data?.data
 } catch (error) {
   return []
 
 }
};

const getBigDiscountList = async () => {
  const response = await axios.get("/api/super-store/big-discounts");
  return response.data;
}; // eslint-disable-next-line import/no-anonymous-default-export

const getPrivacyPolicy = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/version1/policies/privacy-policy`);
    return response?.data?.data
  } catch (error) {
    // console.log(error)
    return null;
  }
};

export default {
  generalSetting,
  getMainCarousel,
  getFlashDeals,
  getSellerList,
  getTopCategories,
  // getBigDiscountList,
  // getTopRatedProduct,
  // getTopRatedBrand,
  getAllProductList,
  getNewArrivalProductList,
  getFeaturedProductList,
  getRelatedProductList,
  getCategoryProductList,
  getReviewsProduct,
  // getCarBrands,
  // getCarList,
  // getMobileBrands,
  // getMobileShops,
  // getMobileList,
  // getOpticsBrands,
  // getOpticsShops,
  // getOpticsList,
  getCategories,
  getMoreItems,
  getServiceList,
  getBestSellerProductList,
  getProductDetailsById,
  getPrivacyPolicy
};
