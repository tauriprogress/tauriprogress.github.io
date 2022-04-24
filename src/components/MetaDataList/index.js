import React from "react";

import withStyles from '@mui/styles/withStyles';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

function styles(theme) {
    return {
        container: {
            width: "260px",
            margin: "0 10px"
        },
        title: {
            backgroundColor: theme.palette.background.darker
        },
        bold: {
            fontWeight: "bold"
        }
    };
}

function MetaDataList({ values, title, classes, className, ...rest }) {
    return (
        <List
            className={`${classes.container} ${className}`}
            component="ul"
            {...rest}
        >
            <ListItem className={classes.title}>
                <Typography color="inherit">{title}</Typography>
            </ListItem>
            {values.map((value, index) => (
                <React.Fragment key={index}>
                    <ListItem>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Typography>{value.label}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.bold}>
                                    {value.value}
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider variant="middle" />
                </React.Fragment>
            ))}
        </List>
    );
}

export default withStyles(styles)(MetaDataList);
