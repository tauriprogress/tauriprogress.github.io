import React from "react";

import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

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
                        <Grid container justify="space-between">
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
