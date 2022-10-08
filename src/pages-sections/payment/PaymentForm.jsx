import { Box, Button, Divider, Grid, Radio, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Card1 from "components/Card1";
import { Paragraph } from "components/Typography";
import useWindowSize from "hooks/useWindowSize";
import useAuth from "../../hooks/useAuth";
import React, { Fragment, useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { useAppContext } from "../checkout/../../contexts/AppContext";
import cogoToast from "cogo-toast";
import Router from "next/router";

const PaymentForm = () => {
  const { user } = useAuth();
  const { state } = useAppContext();
  // console.log('user details', user);
  const cartList = state.cart;
  // console.log('carList mini cart 4',cartList)
  const getTotalPrice = () => {
    return cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  };

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const width = useWindowSize();

  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);
  };

  const config = {
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.token}` 
    },
  };

  const submitOrder = (e, payment_mode) => {
    e.preventDefault();
    console.log('ddd');

    var data = {
        user_id: user.id,
        getTotalPrice: getTotalPrice(),
        cartData: cartList,
        shipping_address_id: 1,
    }

    switch (payment_mode) {
        case 'cod':
            axios.post(`https://bme.com.bd/api/version1/order/store`, 
            data,
            config
            ).then(res=>{
              console.log('sss', res)
                if(res)
                {
                  console.log('ddd')
                  cogoToast.success(`${res.data?.message}`, { position: 'top-right', bar: { size: '10px' } });
                  Router.push("/orders");
                }
                else
                {
                  console.log('fff')
                  cogoToast.error(`${res?.data?.message}`, {
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
