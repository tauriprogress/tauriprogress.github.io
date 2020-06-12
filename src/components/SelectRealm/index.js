import React from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import { realmNames, getRealmFromLocation } from "../../helpers";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

function styles() {
    return {
        gridItem: {
            margin: "10px"
        }
    };
}

function SelectRealm({ classes }) {
    const location = useLocation();
    let realmName = getRealmFromLocation(location);
    return (
        <Grid direction="column" alignItems="center" container>
            <Grid item className={classes.gridItem}>
                <Typography>Current realm: {realmName}</Typography>
            </Grid>
            {realmNames.map(realmName => (
                <Grid key={realmName} className={classes.gridItem} item>
                    <Link
                        component={RouterLink}
                        color="inherit"
                        to={`${location.pathname}?realm=${realmName}`}
                    >
                        <Button variant="contained" color="primary">
                            {realmName}
                        </Button>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
}

export default withStyles(styles)(SelectRealm);
