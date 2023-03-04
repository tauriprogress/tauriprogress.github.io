import React, { useState } from "react";

import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { styled } from "@mui/material";

const CustomList = styled(List)(({ theme }) => ({
    "& li": {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
}));

const Title = styled(ListItemButton)(({ theme }) => ({
    padding: theme.spacing(1),
    "& *": {
        fontWeight: "bold",
    },
}));

const CustomDivider = styled(Divider)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
}));

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
            <Title onClick={() => setOpen(!open)}>
                {listTitle} {open ? <ExpandLess /> : <ExpandMore />}
            </Title>
            <CustomDivider />
            <Collapse in={open} timeout="auto" {...rest}>
                <CustomList component="ul" disablePadding>
                    {children}
                </CustomList>
            </Collapse>
        </React.Fragment>
    );
}

export default CollapseableList;
