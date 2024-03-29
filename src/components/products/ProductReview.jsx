import { Rating } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { H2, H5 } from "components/Typography";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import ProductComment from "./ProductComment";
const BASE_URL = process.env.BASE_URL

const ProductReview = ({reviewsProduct}) => {
  const handleFormSubmit = async (values, { resetForm }) => {
    resetForm();
  };

  console.log('reviewsProduct',reviewsProduct)

  const {
    dirty,
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues: initialValues,
    validationSchema: reviewSchema,
  });

  const itemChange = (item)=>{
    return{
      name: item?.user?.name,
      imgUrl: `${BASE_URL}/public/${item?.user?.image}`,
      rating: item?.rating,
      date: item?.time,
      comment: item?.comment
    }
  }

  return (
    <Box>
      {reviewsProduct.map((item, ind) => (
        <ProductComment itemData={itemChange(item)} key={ind} />
      ))}

      <H2 fontWeight="600" mt={7} mb={2.5}>
        Write a Review for this product
      </H2>

      <form onSubmit={handleSubmit}>
        <Box mb={2.5}>
          <FlexBox mb={1.5} gap={0.5}>
            <H5 color="grey.700">Your Rating</H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <Rating
            color="warn"
            size="medium"
            value={values.rating}
            onChange={(_, value) => setFieldValue("rating", value)}
          />
        </Box>

        <Box mb={3}>
          <FlexBox mb={1.5} gap={0.5}>
            <H5 color="grey.700">Your Review</H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <TextField
            rows={8}
            multiline
            fullWidth
            name="comment"
            variant="outlined"
            onBlur={handleBlur}
            value={values.comment}
            onChange={handleChange}
            placeholder="Write a review here..."
            error={!!touched.comment && !!errors.comment}
            helperText={touched.comment && errors.comment}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!(dirty && isValid)}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

const initialValues = {
  rating: 0,
  comment: "",
  date: new Date().toISOString(),
};
const reviewSchema = yup.object().shape({
  rating: yup.number().required("required"),
  comment: yup.string().required("required"),
});
export default ProductReview;
