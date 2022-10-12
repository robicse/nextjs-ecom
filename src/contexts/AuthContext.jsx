import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react"; 
const BASE_URL = process.env.BASE_URL;
import Axios from "axios";
import api from "utils/api/auth";
import setAuthToken from "utils/setToken";
import cogoToast from "cogo-toast";

const initialSettings = {
  token: null,
  user: null,
  isAuthenticated: false,
  wishList: [],
  cartList: [],
};
export const AuthContext = createContext({
  initialSettings,
  dispatch: () => {},
});

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS_LOGIN":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        token: action.payload.access_token,
      };
    case "SET_CUSTOMER_PROFILE":
      return { ...state, user: action.payload };
    case "LOG_OUT":
      // localStorage.clear();
      return { isAuthenticated: false, user: {}, token: null, wishList: [], cartList: []};
    case "SET_ALL_WISH_LIST":
      return { ...state, wishList: action.payload };

    case "SET_ALL_CART_LIST":
        return { ...state, cart: action.payload };
    default:
      return state;
  }
};
// ============================================================
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialSettings);

  React.useEffect(() => {
    if (!window) return null;
    const auth = window.localStorage.getItem("auth");
    if (auth) {
      const payLoad = JSON.parse(auth);
      dispatch({ type: "SUCCESS_LOGIN", payload: payLoad });
      // setAuthToken(payLoad.access_token)
    }
  }, []);

  const config = {
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.token}` 
    },
  };
  useEffect(() => {
    if (state.token) {
      getAllWishList();
      getAllCartList();
    }
  }, [state.token]);


  // get customer profile
  const getCustomerProfile = async () => {
    try {
      const result = await Axios.get(
        `${BASE_URL}/api/version1/customer-profile`,
        config
      );
      dispatch({
        type: "SET_CUSTOMER_PROFILE",
        payload: result?.data?.data[0],
      });
      return true;
    } catch (err) {
      return false;
      // console.log(err)
    }
  };
  // getCustomerProfile()
  const login = async (values) => {
    try {
      const data = new FormData();
      Object.entries(values).forEach(([key, value]) => data.append(key, value));
      const result = await api.loginApi(values);
      window.localStorage.setItem("auth", JSON.stringify(result.data));
      dispatch({ type: "SUCCESS_LOGIN", payload: result.data });
      setAuthToken(result?.data?.access_token);
      cogoToast.success(`${"Login Success"}`, {
        position: "top-right",
        bar: { size: "10px" },
      });
      return result?.data;
    } catch (err) {
      cogoToast.error(`${"Invalid Credentials"}`, {
        position: "top-right",
        bar: { size: "10px" },
      });
      return false;
    }
  };

  // log out
  const logout = () => {
    dispatch({ type: "LOG_OUT" });
    window.localStorage.removeItem("auth");
    setAuthToken(null);
    return true;
  };

  const customerResistration = async (values) => {
    try {
      const data = new FormData();
      Object.entries(values).forEach(([key, value]) => data.append(key, value));
      await Axios.post(
        `${BASE_URL}/api/version1/auth/signup`,
        data
      );
      cogoToast.success(`${"Registration Success"}`, {
        position: "top-right",
        bar: { size: "10px" },
      });
      // dispatch({ type: 'CUSTOMER_REQ_REQ', payload: res.data });
      return true;
    } catch (err) {
      cogoToast.error(`${res?.data?.response}`, {
        position: "top-right",
        bar: { size: "10px" },
      });
      return false;
    }
  };

  const orderPlace = async (values) => {
    try {
      const data = state.cartList;
      //Object.entries(values).forEach(([key, value]) => data.append(key, value));
      await Axios.post(
        `${BASE_URL}/api/version1/order/store`,
        data
      );
      cogoToast.success(`${"Order Successful!"}`, {
        position: "top-right",
        bar: { size: "10px" },
      });

      return true;
    } catch (err) {
      cogoToast.error(`${res?.data?.response}`, {
        position: "top-right",
        bar: { size: "10px" },
      });
      return false;
    }
  };

  const sellerResistration = async (values) => {
    try {
      const data = new FormData();
      Object.entries(values).forEach(([key, value]) => data.append(key, value));
      await Axios.post(
        `${BASE_URL}/api/version1/auth/seller-register`,
        data
      );
      cogoToast.success(`${"Registration Success"}`, {
        position: "top-right",
        bar: { size: "10px" },
      });
      // dispatch({ type: 'CUSTOMER_REQ_REQ', payload: res.data });
      return true;
    } catch (err) {
      cogoToast.error(`${res?.data?.response}`, {
        position: "top-right",
        bar: { size: "10px" },
      });
      return false;
    }
  };

  // const sellerResistration = async (values) => {
  //   try {
  //     const data = new FormData();
  //     Object.entries(values).forEach(([key, value]) => data.append(key, value));
  //     const res = await Axios.post(
  //       `http://ecommerce.staritltd-devemon.one/api/v1/auth//seller-register`,
  //       data
  //     );
  //     cogoToast.success(`${"Login Success"}`, {
  //       position: "top-right",
  //       bar: { size: "10px" },
  //     });
  //     dispatch({ type: "CUSTOMER_REQ_REQ", payload: res.data });
  //     return true;
  //   } catch (err) {
  //     // console.log(err)
  //     cogoToast.error(`${"Invalid Credentials"}`, {
  //       position: "top-right",
  //       bar: { size: "10px" },
  //     });
  //     return false;
  //   }
  // };

  // get wishListForLoginCustomer
  const getAllWishList = async () => {
    try {
      const res = await Axios.get(
        `${BASE_URL}/api/version1/wishlists`,
        config
      );
      if (!!res?.data?.data.length) {
        dispatch({ type: "SET_ALL_WISH_LIST", payload: res?.data?.data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllCartList = async () => {
    try {
      const res = await Axios.get(
        `${BASE_URL}/api/version1/carts`,
        config
      );
      if (!!res?.data?.data.length) {
        dispatch({ type: "SET_ALL_CART_LIST", payload: [] });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (product_id) => {
    try {
      // const res = await Axios.post(
      //   `${BASE_URL}/api/version1/wishlists`,
      //   { product_id},
      //   config
      // );
      // console.log(res)
      dispatch({
        type: "SET_ALL_WISH_LIST",
        payload: [],
        // payload: res.data?.response?.data,
      });
      // cogoToast.success(`${res.data?.message}`, {
      //   position: "top-right",
      //   bar: { size: "10px" },
      // });
    } catch (err) {
      console.log(err);
    }
  };

 
  const removeFromCart = async (cartItemId) => {
    try {
      // const res = await Axios.delete(
      //   `${BASE_URL}/api/version1/wishlists/${cartItemId}`,
      //   config
      // );
      dispatch({
        type: "SET_ALL_WISH_LIST",
        payload: [],
        // payload: res.data?.response?.data,
      });
      // cogoToast.success(`${res.data?.message}`, {
      //   position: "top-right",
      //   bar: { size: "10px" },
      // });
    } catch (err) {
      console.log(err);
      // console.log(err)
    }
  };

  

  const addNewWishList = async (productId) => {
    console.log(productId)
    try {
      const res = await Axios.post(
        `${BASE_URL}/api/version1/wishlists`,
        { product_id: productId },
        config
      );
      console.log(res)
      dispatch({
        type: "SET_ALL_WISH_LIST",
        payload: res.data?.response?.data,
      });
      cogoToast.success(`${res.data?.message}`, {
        position: "top-right",
        bar: { size: "10px" },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removefromWishList = async (wishListId) => {
    try {
      const res = await Axios.delete(
        `${BASE_URL}/api/version1/wishlists/${wishListId}`,
        config
      );
      dispatch({
        type: "SET_ALL_WISH_LIST",
        payload: res.data?.response?.data,
      });
      cogoToast.success(`${res.data?.message}`, {
        position: "top-right",
        bar: { size: "10px" },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getAllAddress = async (p) => {
    try {
      const res = await Axios.get(
        `https://bme.com.bd/api/version1/user/shipping/address`,
        config
      );
      return res?.data;
    } catch (err) {
      console.log(err);
    }
  };

  const addAddress = async (value) => {
    try {
      const res = await Axios.post(
        `${BASE_URL}/api/version1/user/shipping/create`,
        value,
        config
      );
      cogoToast.success(`${res.data?.message}`, {
        position: "top-right",
        bar: { size: "10px" },
      });
      return true;
    } catch (err) {
      cogoToast.error(`Server Error`, {
        position: "top-right",
        bar: { size: "10px" },
      });
      return false;
    }
  };

  const updateAddress = async (value) => {
    try {
      const res=  await Axios.put(`${BASE_URL}/api/version1/user/shipping/edit/${value.id}`,value,config)
      cogoToast.success(`${res.data?.message}`, { position: 'top-right', bar: { size: '10px' } });
      return true
    } catch (err) {
      cogoToast.error(`Server Error`, { position: 'top-right', bar: { size: '10px' } });
      return false
    }
  };
  const deleteAddress = async (id) => {
    try {
      const res = await Axios.delete(
        `${BASE_URL}/api/version1/user/shipping/delete/${id}`,
        config
      );
      cogoToast.success(`${res.data?.message}`, {
        position: "top-right",
        bar: { size: "10px" },
      });
      return true;
    } catch (err) {
      cogoToast.error(`Server Error`, {
        position: "top-right",
        bar: { size: "10px" },
      });
      return false;
    }
  };

  const getCustomerDashboard = async () => {
    try {
      const response = await Axios.get(
        `${BASE_URL}/api/version1/customer-dashboard/info`,
        config
      );
      return response?.data;
    } catch (error) {
      console.log(error)
      return null;
    }
  };

  const updateCustomerProfile = async (value) => {
    try {
      const res=  await Axios.put(`${BASE_URL}/api/version1/customer-profile/update/${value.id}`,value,config)
      dispatch({ type: "SET_CUSTOMER_PROFILE", payload: res?.data?.response });
      cogoToast.success(`${res.data?.msg}`, { position: 'top-right', bar: { size: '10px' } });
      return true
    } catch (err) {
      cogoToast.error(`Server Error`, { position: 'top-right', bar: { size: '10px' } });
      return false
    }
  };

  const setDefaultAddress = async (id) => {
    try {
      const res = await Axios.get(
        `${BASE_URL}/api/version1/user/shipping/set/default/${id}`,
        config
      );
      cogoToast.success(`${res.data?.message}`, {
        position: "top-right",
        bar: { size: "10px" },
      });
      return true;
    } catch (err) {
      cogoToast.error(`Server Error`, {
        position: "top-right",
        bar: { size: "10px" },
      });
      return false;
    }
  };

  const getCustomerPurchaseHistory = async (p) => {
    try {
      const response = await Axios.get(
        //`${BASE_URL}/api/version1/purchase-history?page=${p}`,
        `${BASE_URL}/api/version1/purchase-history`,
        config
      );
      return response?.data;
    } catch (error) {
      // console.log(error)
      return null;
    }
  };

  const getCustomerWishList = async (p) => {
    try {
      const response = await Axios.get(
        `${BASE_URL}/api/version1/purchase-history?page=${p}`,
        config
      );
      return response?.data;
    } catch (error) {
      // console.log(error)
      return null;
    }
  };

  const getCustomerPurchaseHistoryDetailById = async (id) => {
    try {
      const response = await Axios.get(
        `${BASE_URL}/api/version1/purchase-history/${id}`,
        config
      );
      return response.data;
    } catch (err) {
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        logout,
        login,
        customerResistration,
        sellerResistration,
        wishList: state.wishList,
        cartList: state.cartList,
        addToCart,
        removeFromCart,
        addNewWishList,
        removefromWishList,
        getAllAddress,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        getCustomerProfile,
        getCustomerDashboard,
        updateCustomerProfile,
        getCustomerPurchaseHistory,
        getCustomerPurchaseHistoryDetailById,
        orderPlace
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
console.log("hh")
export const useAppContext = () => useContext(AuthContext);
export default AuthProvider;
