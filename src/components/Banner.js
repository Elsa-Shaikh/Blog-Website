import { Box, Typography, styled } from "@mui/material";
import React from "react";

const BgImage = styled(Box)`
  background: url(https://png.pngtree.com/png-vector/20220810/ourmid/pngtree-blogging-concept-picture-writer-laptop-png-image_5722986.png)
    center/55% repeat-x #000;
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Banner = () => {
  return (
    <>
      <BgImage>
        <Typography
          variant="h3"
          sx={{
            textTransform: "uppercase",
            fontWeight: "bold",
            bgcolor: "black",
            color: "white",
            padding: "10px",
            fontSize: {
              xs: ".9rem", // Font size for extra-small screens
              md: "3rem", // Font size for medium screens
              lg: "3rem", // Font size for large screens
            },
          }}
        >
          Blog Website
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontSize: {
              xs: ".9rem", // Font size for extra-small screens
              md: "3rem", // Font size for medium screens
              lg: "3rem", // Font size for large screens
            },
            textTransform: "uppercase",
            fontWeight: "bold",
            bgcolor: "white",
            color: "black",
            padding: "10px",
          }}
        >
          Write Your Own Blog!
        </Typography>
      </BgImage>
    </>
  );
};

export default Banner;
