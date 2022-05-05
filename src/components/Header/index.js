import React, { useState } from "react";
import { useDispatch } from "react-redux";

import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Brightness from "@mui/icons-material/Brightness6";

import LeftNavItems from "./LeftNavItems";

import discordIcon from "../../assets/social/discord.svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { themeToggle } from "../../redux/actions";
import { styled } from "@mui/system";

export const headerHeight = "55px";
const rightNavBreakpoint = "500px";

const discordLink = "https://discordapp.com/invite/3RWayqd";

const HeaderContainer = styled("div")({
    height: headerHeight,
});

const HeaderElement = styled("header")(({ theme }) => ({
    height: headerHeight,
    width: "100%",
    position: "fixed",
    zIndex: 1000,
    backgroundColor: theme.palette.background.darker,
}));

export const TallGrid = styled(Grid)({
    height: "100%",
});

const ExtendedNavGrid = styled(Grid)({
    height: "100%",
    [`@media(max-width: ${rightNavBreakpoint})`]: {
        display: "none",
    },
});

const CompactNavGrid = styled(Grid)({
    height: "100%",
    [`@media(min-width: ${rightNavBreakpoint})`]: {
        display: "none",
    },
});

export const VeritcalCenterGrid = styled(Grid)({
    display: "flex",
    alignItems: "center",
});

function RightNavItems() {
    const dispatch = useDispatch();
    return (
        <>
            <VeritcalCenterGrid item>
                <IconButton
                    component="a"
                    href={discordLink}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{
                        margin: "auto",
                    }}
                >
                    <img src={discordIcon} alt="Discord" />
                </IconButton>
            </VeritcalCenterGrid>
            <VeritcalCenterGrid item>
                <IconButton
                    color="inherit"
                    onClick={() => dispatch(themeToggle())}
                >
                    <Brightness fontSize="large" />
                </IconButton>
            </VeritcalCenterGrid>
        </>
    );
}

function Header() {
    const [open, setOpen] = useState(false);
    return (
        <HeaderContainer>
            <HeaderElement>
                <TallGrid
                    container
                    justifyContent="space-between"
                    wrap="nowrap"
                    alignContent="center"
                >
                    <TallGrid item>
                        <LeftNavItems />
                    </TallGrid>
                    <TallGrid item>
                        <ExtendedNavGrid container>
                            <RightNavItems />
                        </ExtendedNavGrid>
                        <CompactNavGrid container>
                            <VeritcalCenterGrid item>
                                <IconButton
                                    color="inherit"
                                    onClick={() => setOpen(!open)}
                                >
                                    <MoreHorizIcon fontSize="large" />
                                </IconButton>
                            </VeritcalCenterGrid>
                            <Drawer
                                open={open}
                                onClose={() => setOpen(false)}
                                anchor="right"
                            >
                                <Grid container direction="column">
                                    <RightNavItems />
                                </Grid>
                            </Drawer>
                        </CompactNavGrid>
                    </TallGrid>
                </TallGrid>
                <Divider />
            </HeaderElement>
        </HeaderContainer>
    );
}

export default Header;
