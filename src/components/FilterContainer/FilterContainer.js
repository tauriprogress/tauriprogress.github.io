import React from "react";

import { withStyles } from "@mui/styles";
import Container from "@mui/material/Container";

function styles(theme) {
    return {
        container: {
            padding: 0,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            "& .MuiFormControl-root": {
                margin: `0 ${theme.spacing(1)}`
            }
        }
    };
}

function FilterContainer({ classes, children }) {
    return <Container className={classes.container}>{children}</Container>;
}

export default withStyles(styles)(FilterContainer);
