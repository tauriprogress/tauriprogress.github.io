import React from "react";

import { withStyles } from "@material-ui/styles";

function styles(theme) {
    return {
        container: {
            maxWidth: "100vw",
            display: "flex",
            [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
                flexWrap: "wrap"
            }
        },
        itemOne: {
            [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
                margin: "auto"
            },
            width: "260px",
            textAlign: "center"
        },
        itemTwo: {
            flexGrow: 1,
            margin: `0 ${theme.spacing(1)}px`,
            overflow: "hidden"
        }
    };
}

function AsideContainer({ classes, AsideComponent, children, ...rest }) {
    return (
        <div {...rest} className={`${classes.container} ${rest.className}`}>
            <aside className={classes.itemOne}>
                <AsideComponent />
            </aside>
            <section className={classes.itemTwo}>{children}</section>
        </div>
    );
}

export default withStyles(styles)(AsideContainer);
