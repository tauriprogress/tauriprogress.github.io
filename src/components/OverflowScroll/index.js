import React from "react";
import { styled } from "@mui/material/styles";

const Container = styled("div")(({ theme }) => ({
    overflowX: "scroll",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
        display: "none",
    },
}));

function OverflowScroll({ classes, children, ...props }) {
    return <Container {...props}>{children}</Container>;
}

export default OverflowScroll;
