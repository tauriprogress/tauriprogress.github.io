import React from "react";

import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from "@material-ui/core";

function styles(theme) {
    return {
        title: {
            backgroundColor: theme.palette.primary.main,
            "& *": {
                color: `${theme.palette.primary.contrastText} !important`
            }
        }
    };
}

function MetaDataList({ className, values, title, classes }) {
    return (
        <List className={className + " metaDataList"} component="ul">
            <ListItem className={classes.title}>
                <ListItemText color="inherit" primary={title} />
            </ListItem>
            {values.map((value, index) => (
                <ListItem key={index}>
                    <ListItemText
                        primary={
                            <div className="metaDataListItemContainer">
                                {value.label}
                                <Typography
                                    className={"textBold"}
                                    component="span"
                                >
                                    {value.value}
                                </Typography>
                            </div>
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
}

export default withStyles(styles)(MetaDataList);
