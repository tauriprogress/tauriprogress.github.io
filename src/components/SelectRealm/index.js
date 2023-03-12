import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";
import queryString from "query-string";

import Button from "@mui/material/Button";

import { getRealmNames } from "../../helpers";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { environmentRealmsSelector } from "../../redux/selectors";

import { styled } from "@mui/material";

const GridItem = styled(Grid)(({ theme }) => ({
    margin: "10px",
}));

function SelectRealm() {
    const location = useLocation();

    let realmName = queryString.parse(location.search).realm;
    let realms = getRealmNames(useSelector(environmentRealmsSelector));

    return (
        <Grid direction="column" alignItems="center" container>
            <GridItem item>
                <Typography>Current realm: {realmName}</Typography>
            </GridItem>
            {realms.map((realmName) => (
                <GridItem key={realmName} item>
                    <Link
                        component={RouterLink}
                        color="inherit"
                        to={`${location.pathname}?realm=${realmName}`}
                    >
                        <Button variant="contained" color="primary">
                            {realmName}
                        </Button>
                    </Link>
                </GridItem>
            ))}
        </Grid>
    );
}

export default SelectRealm;
