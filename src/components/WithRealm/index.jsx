import React from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { styled } from "@mui/material";

const GridItemText = styled(Grid)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: `${11 / 16}rem`,
    lineHeight: `${11 / 16}rem`,
}));

const SecondaryText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: `${11 / 16}rem`,
    lineHeight: `${11 / 16}rem`,
}));

function WithRealm({ children, realmName }) {
    return (
        <Grid container direction="column">
            <Grid item>{children}</Grid>
            <GridItemText item>
                <SecondaryText variant="caption">{realmName}</SecondaryText>
            </GridItemText>
        </Grid>
    );
}

export default WithRealm;
