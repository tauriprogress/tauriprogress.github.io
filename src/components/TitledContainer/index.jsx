import React from "react";

import Typography from "@mui/material/Typography";

import { styled } from "@mui/material";

const Container = styled("div")(({ theme }) => ({
    margin: `0 ${theme.spacing(1)}`,
    minWidth: "260px",
    maxWidth: "260px",
}));

const Title = styled(Typography)(({ theme }) => ({
    backgroundColor: theme.palette.background.dark,
    padding: theme.spacing(1),
}));

function TitledContainer({ title, children, ...rest }) {
    return (
        <Container {...rest}>
            <Title>{title}</Title>
            {children}
        </Container>
    );
}

export default TitledContainer;
