import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/system";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemText from "@mui/material/ListItemText";

import Link from "../Link";

import { getRaidImg } from "../../helpers";

import { navigationToggle } from "../../redux/actions";

import { navBreakpoint } from "../../redux/navigation/reducer";

import { navigationItemSelector } from "../../redux/selectors";

const Title = styled(ListItemButton)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: theme.palette.primary.main,
}));

const SmallNestedListItemButton = styled(ListItemButton)(({ theme }) => ({
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(5),
}));

function RaidBossList({ raid }) {
    const [open, setOpen] = useState(true);
    const selected = useSelector(navigationItemSelector);
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <Title
                onClick={() => setOpen(open ? false : true)}
                style={{
                    backgroundImage: `url("${getRaidImg(raid.image)}")`,
                }}
            >
                <ListItemText primary={raid.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </Title>
            <Collapse in={open} timeout="auto">
                <List disablePadding>
                    <Link
                        color="inherit"
                        to={`/raid/${raid.name}`}
                        onClick={() => {
                            if (window.innerWidth < navBreakpoint) {
                                dispatch(navigationToggle(false));
                            }
                        }}
                    >
                        <SmallNestedListItemButton
                            component="li"
                            selected={selected === raid.name}
                        >
                            <ListItemText primary={"Summary"} />
                        </SmallNestedListItemButton>
                    </Link>
                    {raid.bosses.map((boss) => {
                        let linkTo = `/raid/${raid.name}/${boss.name}`;

                        return (
                            <Link
                                key={boss.name}
                                color="inherit"
                                to={linkTo}
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                    if (window.innerWidth < navBreakpoint) {
                                        dispatch(navigationToggle(false));
                                    }
                                }}
                            >
                                <SmallNestedListItemButton
                                    selected={selected === boss.name}
                                >
                                    <ListItemText primary={boss.name} />
                                </SmallNestedListItemButton>
                            </Link>
                        );
                    })}
                </List>
            </Collapse>
        </React.Fragment>
    );
}

export default React.memo(RaidBossList);
