import React from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";

import { styled } from "@mui/material";

const CustomContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    maxWidth: "280px !important",
    margin: "0 auto",
}));

function Loading() {
    return (
        <CustomContainer>
            <CircularProgress color="secondary" />
        </CustomContainer>
    );
}

export default Loading;
