import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import withStyles from '@mui/styles/withStyles';
import queryString from "query-string";

import Button from "@mui/material/Button";

import { getRealmNames } from "../../helpers";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { environmentRealmsSelector } from "../../redux/selectors";

function styles() {
    return {
        gridItem: {
            margin: "10px"
        }
    };
}

function SelectRealm({ classes }) {
    const location = useSelector(state => state.router.location);

    let realmName = queryString.parse(location.search).realm;
    let realms = getRealmNames(useSelector(environmentRealmsSelector));

    return (
        <Grid direction="column" alignItems="center" container>
            <Grid item className={classes.gridItem}>
                <Typography>Current realm: {realmName}</Typography>
            </Grid>
            {realms.map(realmName => (
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
