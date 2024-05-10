import { Typography, Alert, AlertTitle } from "@mui/material";
import React from "react";
import { styled } from "@mui/material";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

const ErrorHandlerContainer = styled(Alert)(({ theme }) => ({
    margin: theme.spacing(5),
}));

function HandleError({ error }) {
    return (
        <ErrorHandlerContainer variant="filled" severity="error">
            <AlertTitle>Something went wrong.</AlertTitle>
            {error.message && (
                <React.Fragment>
                    <Typography variant="caption">
                        Report this error on discord:
                    </Typography>

                    <Typography>{error.message}</Typography>

                    {error.stack && (
                        <Typography variant="caption">{error.stack}</Typography>
                    )}
                </React.Fragment>
            )}
        </ErrorHandlerContainer>
    );
}

function ErrorBoundary({ children }) {
    return (
        <ReactErrorBoundary FallbackComponent={HandleError}>
            {children}
        </ReactErrorBoundary>
    );
}

export default ErrorBoundary;
