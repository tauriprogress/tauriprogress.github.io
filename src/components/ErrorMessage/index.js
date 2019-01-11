import React from "react";

import Card from "@material-ui/core/Card";

import ErrorIcon from "@material-ui/icons/Error";

function ErrorMessage({ message }) {
    return (
        <div className="error">
            <Card className="errorMessage">
                <ErrorIcon className="errorMessageIcon" />
                <span>{message}</span>
            </Card>
        </div>
    );
}

export default ErrorMessage;
