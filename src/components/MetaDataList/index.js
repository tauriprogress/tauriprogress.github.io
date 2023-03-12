import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import { styled } from "@mui/material";

const CustomList = styled(List)(({ theme }) => ({
    width: "260px",
    margin: "auto",
}));

const ListItemTitle = styled(ListItem)(({ theme }) => ({
    backgroundColor: theme.palette.background.dark,
}));

const BoldTypography = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
}));

function MetaDataList({ values, title, ...rest }) {
    return (
        <CustomList component="ul" {...rest}>
            <ListItemTitle>
                <Typography color="inherit">{title}</Typography>
            </ListItemTitle>
            {values.map((value, index) => (
                <React.Fragment key={index}>
                    <ListItem>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Typography>{value.label}</Typography>
                            </Grid>
                            <Grid item>
                                <BoldTypography>{value.value}</BoldTypography>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider variant="middle" />
                </React.Fragment>
            ))}
        </CustomList>
    );
}

export default MetaDataList;
