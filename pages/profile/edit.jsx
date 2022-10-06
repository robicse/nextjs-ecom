import CameraEnhance from "@mui/icons-material/CameraEnhance";
import Person from "@mui/icons-material/Person";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Avatar, Box, Button, Grid, TextField } from "@mui/material";
import Card1 from "components/Card1";
import { FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { Formik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import imageUrlFormat from "utils/imageUrlFormat";
import useAuth from "hooks/useAuth";


const ProfileEditor = () => {
  const { user, token, updateCustomerProfile } = useAuth();
  // console.log(user?.name)
  // const handleFormSubmit = async (values) => {
  //   updateCustomerProfilevalues(values,token);
  // };
  const handleFormSubmit = async (value) => {
    console.log('value1', value)
    const res2 = await updateCustomerProfile(value);
    // if (res2) {
    //   await getAllHandleFetch();
    //   handleEditAddressForm(null);
    // }
  };

  const initialValues = {
    first_name: user?.name,
    last_name: user?.name,
    email: user?.email,
    phone: user?.phone,
    // birth_date: new Date(user?.created_at),
  };
  const checkoutSchema = yup.object().shape({
    first_name: yup.string().required("required"),
    last_name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phone: yup.string().required("required"),
    // birth_date: yup.date().required("invalid date"),
  });
  return (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={Person}
        title="Edit Profile"
        navigation={<CustomerDashboardNavigation />}
        button={
          <Link href="/profile" passHref>
            <Button
              color="primary"
              sx={{
                px: 4,
                bgcolor: "primary.light",
              }}
            >
              Back to Profile
            </Button>
          </Link>
        }
      />

      <Card1>
        <FlexBox alignItems="flex-end" mb={3}>
          <Avatar
            src={imageUrlFormat(user?.avatar)}
            sx={{
              height: 64,
              width: 64,
            }}
          />

          <Box ml={-2.5}>
            <label htmlFor="profile-image">
              <Button
                component="span"
                color="secondary"
                sx={{
                  p: "8px",
                  height: "auto",
                  bgcolor: "grey.300",
                  borderRadius: "50%",
                }}
              >
                <CameraEnhance fontSize="small" />
              </Button>
            </label>
          </Box>

          <Box display="none">
            <input
              onChange={(e) => console.log(e.target.files)}
              id="profile-image"
              accept="image/*"
              type="file"
            />
          </Box>
        </FlexBox>

        <Formik
           enableReinitialize
          initialValues={{
            id: user?.id,
            name: user?.name || 'gsdg',
            email: user?.email,
            phone: user?.phone,
            // birth_date: new Date(user?.created_at),
            password: "",
            confirm_password: ""
          }}
          // validationSchema={checkoutSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="name"
                      label="Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      label="Email"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      onBlur={handleBlur}
                      value={values.phone}
                      onChange={handleChange}
                      error={!!touched.phone && !!errors.phone}
                      helperText={touched.phone && errors.phone}
                    />
                  </Grid>
                  {/* <Grid item md={6} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        label="Join Date"
                        maxDate={new Date()}
                        value={values.birth_date}
                        inputFormat="dd MMMM, yyyy"
                        shouldDisableTime={() => false}
                        renderInput={(props) => (
                          <TextField
                            disabled
                            fullWidth
                            size="small"
                            helperText={touched.birth_date && errors.birth_date}
                            error={
                              (!!touched.birth_date && !!errors.birth_date) ||
                              props.error
                            }
                            {...props}
                          />
                        )}
                        onChange={(newValue) =>
                          setFieldValue("birth_date", newValue)
                        }
                      />
                    </LocalizationProvider>
                  </Grid> */}
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      error={!!touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      name="confirm_password"
                      onBlur={handleBlur}
                      value={values.confirm_password}
                      onChange={handleChange}
                      error={!!touched.confirm_password && !!errors.confirm_password}
                      helperText={touched.confirm_password && errors.confirm_password}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
    </CustomerDashboardLayout>
  );
};


export default ProfileEditor;
