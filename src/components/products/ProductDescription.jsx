import { Box } from "@mui/material";
import { H3 } from "components/Typography";
import React from "react"; // ======================================================
import { stripHtml } from "string-strip-html";

// ======================================================

const ProductDescription = ({ product }) => {
  // console.log('product2',product);
  const { description } = product;
  
  return (
    <Box>
      <H3 mb={2}>Specification:</H3>
      <Box>
        {/* Brand: Beats <br />
        Model: S450 <br />
        Wireless Bluetooth Headset <br />
        FM Frequency Response: 87.5 – 108 MHz <br />
        Feature: FM Radio, Card Supported (Micro SD / TF) <br />
        Made in China <br /> */}
        {description}
      </Box>
    </Box>
  );
};

export default ProductDescription;
