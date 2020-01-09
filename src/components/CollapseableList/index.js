import React, { useState } from "react";

import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

function styles(theme) {
    return {
        list: {
            "& li": {
                paddingLeft: theme.spacing(2)
            }
        },
        title: {
            padding: theme.spacing(1),
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderRadius: "4px",
            "&:hover": {
                backgroundColor: theme.baseColors.darkAccent
            }
        }
    };
}

function CollapseableList({ classes, listTitle, children, ...rest }) {
    const [open, setOpen] = useState(true);
    return (
        <React.Fragment>
            <ListItem
                onClick={() => setOpen(!open)}
                button
                className={classes.title}
            >
                {listTitle} {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" {...rest}>
                <List component="ul" disablePadding className={classes.list}>
                    {children}
                </List>
            </Collapse>
        </React.Fragment>
    );
}

export default withStyles(styles)(CollapseableList);
