import { Box, Button, Divider, Grid, Radio, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Card1 from "components/Card1";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import { Formik } from "formik";
// import { useFormik } from "formik";
import useWindowSize from "hooks/useWindowSize";
import useAuth from "../../hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import * as yup from "yup";
import axios from "axios";
//import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { useAppContext } from "../checkout/../../contexts/AppContext";
import cogoToast from "cogo-toast";

const PaymentForm = () => {
  const { user, orderPlace } = useAuth();
  const { state } = useAppContext();
  console.log('user details', user);
  const cartList = state.cart;
  console.log('carList mini cart 4',cartList)
  const getTotalPrice = () => {
    return cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  };

  // const { handleChange, handleSubmit, errors, touched, values } = useFormik({
  //   initialValues: initialValues,
  //   validationSchema: checkoutSchema,
  //   onSubmit: (values) => {
  //     console.log('sdfsfd',values)
  //     if (values) {
  //       console.log('ggg')
  //     }
  //   },
  // });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const width = useWindowSize();
  const router = useRouter();
  const isMobile = width < 769;

  // console.log('11')
  // const handleFormSubmit = (e) => {
  //   console.log('value1', 'kk')
    //const res2 = await updateCustomerProfile(value);
    // if (res2) {
    //   await getAllHandleFetch();
    //   handleEditAddressForm(null);
    // }
  // };
  // console.log('22')

  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);
  };

  
  // const handleSubmit =  () => {
  //   console.log('aaa');
    // const res = await orderPlace(values);
    // if (res) {
    //   console.log('1',res)
    // }else{
    //   console.log('2')
    // }
  // };





  //const history = useHistory();
  // if(!localStorage.getItem('auth_token')){
  //     history.push('/');
  //     swal("Warning","Login to goto Cart Page","error");
  // }
  
  const [loading, setLoading] = useState(true);
  // const { cartList } = useAuth();
  // var totalCartPrice = 0;

//   useEffect(() => {

//     let isMounted = true;

//     axios.get(`/api/cart`).then(res=>{
//         if(isMounted)
//         {
//             if(res.data.status === 200)
//             {
//                 setCart(res.data.cart);
//                 setLoading(false);
//             }
//             else if(res.data.status === 401)
//             {
//                 history.push('/');
//                 swal("Warning",res.data.message,"error");
//             }
//         }
//     }); 

//     return () => {
//         isMounted = false
//     };
// }, [history]);


  const config = {
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.token}` 
    },
  };

  const submitOrder = (e, payment_mode) => {
    e.preventDefault();
    console.log('ddd');

  //   const shipping_address = {
  //     name: "Test",
  //     phone: "01700000000",
  //     email: "test@gmail.com",
  //     address: "Mirpur",
  //     country:"Bangladesh",
  //     city: "Dhaka",
  //     state: "Dhaka",
  //     postal_code: "5300",
  //     checkout_type:"logged",
  //     payment_mode: "cod",
  // };


    var data = {
        user_id: user.id,
        getTotalPrice: getTotalPrice(),
        cartData: cartList,
        //shipping_address: shipping_address,
        shipping_address_id: 1,
    }

    switch (payment_mode) {
        case 'cod':
            axios.post(`https://bme.com.bd/api/version1/order/store`, 
            data,
            config
            ).then(res=>{
                if(res.data.status === 200)
                {
                  cogoToast.success(`${res.data?.msg}`, { position: 'top-right', bar: { size: '10px' } });
                  history.push('/order');
                }
                else
                {
                  cogoToast.error(`${res?.data?.response}`, {
                    position: "top-right",
                    bar: { size: "10px" },
                  });
                  return false;
                }
            });
            break;
    
        default:
            break;
    }
   
}










  return (
    <Fragment>

      <Card1
        sx={{
          mb: 4,
        }}
      >
        
        <FormControlLabel
          name="cod"
          onChange={handlePaymentMethodChange}
          label={<Paragraph fontWeight={600}>Cash On Delivery</Paragraph>}
          control={
            <Radio
              checked={paymentMethod === "cod"}
              color="primary"
              size="small"
            />
          }
        />
      </Card1>

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <button type="button" className="btn btn-primary mx-1" onClick={ (e) => submitOrder(e, 'cod') }>Place Order</button>
        </Grid>
      </Grid>

    </Fragment>
  );
};

const initialValues = {
  card_no: "",
  name: "",
  exp_date: "",
  cvc: "",
  shipping_zip: "",
  shipping_country: "",
  shipping_address1: "",
  shipping_address2: "",
  billing_name: "",
  billing_email: "",
  billing_contact: "",
  billing_company: "",
  billing_zip: "",
  billing_country: "",
  billing_address1: "",
  billing_address2: "",
};
const checkoutSchema = yup.object().shape({
  card_no: yup.string().required("required"),
  name: yup.string().required("required"),
  exp_date: yup.string().required("required"),
  cvc: yup.string().required("required"), // shipping_zip: yup.string().required("required"),
  // shipping_country: yup.object().required("required"),
  // shipping_address1: yup.string().required("required"),
  // billing_name: yup.string().required("required"),
  // billing_email: yup.string().required("required"),
  // billing_contact: yup.string().required("required"),
  // billing_zip: yup.string().required("required"),
  // billing_country: yup.string().required("required"),
  // billing_address1: yup.string().required("required"),
});
export default PaymentForm;
