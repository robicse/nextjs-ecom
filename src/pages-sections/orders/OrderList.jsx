import React, { useEffect, useState } from "react";
import { Pagination, Typography } from "@mui/material";
import { FlexBox } from "components/flex-box";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { Fragment } from "react";
import OrderRow from "./OrderRow"; 
import useAuth from "hooks/useAuth";

const IndexPage = (props) => {
  const {
    logout,
    isAuthenticated,
    login,
    token,
    user,
    getCustomerPurchaseHistory,
  } = useAuth();
  const [orderLis, setOrderLis] = useState([]);
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const fetchOrderList = async (p) => {
    const data = await getCustomerPurchaseHistory(p);
    if(data){
      setOrderLis(data);
      const total = data.meta.total
      const per_page = data.meta.per_page
      const pageCount  = Math.ceil(total/ per_page)
      setCount(pageCount)
    }
  };
  useEffect(() => {
    fetchOrderList(page);
  }, [page]);

  return (
    <Fragment>
      {!orderLis?.data?.length ? (
        <Typography textAlign="center" mt={10}>
          Order Not Found
        </Typography>
      ) : (
        <div>
          <TableRow
            elevation={0}
            sx={{
              padding: "0px 18px",
              background: "none",
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
              Order #
            </H5>

            <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
              Status
            </H5>

            <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
              Date purchased
            </H5>

            <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
              Total
            </H5>
            <H5 flex="0 0 0 !important" color="grey.600" px={2.75} my={0} />
          </TableRow>

          {orderLis?.data?.map((item) => (
            <OrderRow item={item} />
          ))}
                <FlexBox justifyContent="center" mt={5}>
        <Pagination
          page={page}
          color="primary"
          variant="outlined"
          count={count}
          onChange={handleChangePage}
        />
      </FlexBox>
        </div>
      )}

    </Fragment>
  );
};

export default IndexPage;
