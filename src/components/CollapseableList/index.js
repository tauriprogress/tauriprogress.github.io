import React, { useState } from "react";

import withStyles from '@mui/styles/withStyles';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

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
