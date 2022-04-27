import React from "react";

import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const ErrorContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: "block",
    maxWidth: "400px !important",
    margin: "0 auto",
}));

const RefreshButton = styled(Button)(({ theme }) => ({
    marginTop: "20px",
    fontSize: `${16 / 16}rem`,
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.primary.main,
    "&:hover": {
        backgroundColor: theme.palette.warning.light,
    },
}));

function ErrorMessage({ message, refresh }) {
    return (
        <ErrorContainer>
            <Alert variant="filled" severity="error">
                <AlertTitle>Error</AlertTitle>
                <Typography>{message}</Typography>
            </Alert>
            {refresh && (
                <RefreshButton
                    size="large"
                    variant="contained"
                    onClick={refresh}
                    fullWidth
                >
                    <RefreshIcon fontSize="large" />
                    Refresh
                </RefreshButton>
            )}
        </ErrorContainer>
    );
}

export default ErrorMessage;
