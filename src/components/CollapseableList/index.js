import React, { useState } from "react";

import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

function styles(theme) {
    return {
        list: {
            "& li": {
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(1)
            }
        },
        title: {
            padding: theme.spacing(1),
            "& *": {
                fontWeight: "bold"
            }
        },
        divider: {
            backgroundColor: theme.palette.secondary.main
        }
    };
}

function CollapseableList({
    classes,
    listTitle,
    children,
    defaultState = true,
    ...rest
}) {
    const [open, setOpen] = useState(defaultState);
    return (
        <React.Fragment>
            <ListItem
                onClick={() => setOpen(!open)}
                button
                className={classes.title}
            >
                {listTitle} {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Divider className={classes.divider} />
            <Collapse in={open} timeout="auto" {...rest}>
                <List component="ul" disablePadding className={classes.list}>
                    {children}
                </List>
            </Collapse>
        </React.Fragment>
    );
}

export default withStyles(styles)(CollapseableList);
