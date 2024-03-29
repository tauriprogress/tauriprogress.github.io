import React, { useState } from "react";
import { useDispatch } from "react-redux";

import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Brightness from "@mui/icons-material/Brightness6";
import { Button } from "@mui/material";

import LeftNavItems from "./LeftNavItems";

import discordIcon from "/assets/social/discord.svg";
import patreonWordmark from "/assets/social/Digital-Patreon-Wordmark_FieryCoral.png";
import patreonLogo from "/assets/social/Digital-Patreon-Logo_FieryCoral.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { themeToggle } from "../../redux/actions";
import { styled } from "@mui/system";

export const headerHeight = "55px";
export const rightNavBreakpoint = "500px";

const discordLink = "https://discordapp.com/invite/3RWayqd";
const patreonLink = "https://www.patreon.com/Tauriprogress";

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
});

export const VeritcalCenterGrid = styled(Grid)({
    display: "flex",
    alignItems: "center",
});

export const VeritcalCenterGridWideScreen = styled(VeritcalCenterGrid)({
    [`@media(max-width: ${rightNavBreakpoint})`]: {
        display: "none",
    },
});

export const VeritcalCenterGridNarrowScreen = styled(VeritcalCenterGrid)({
    [`@media(min-width: ${rightNavBreakpoint})`]: {
        display: "none",
    },
});

const FixSizedButton = styled(Button)(({ theme }) => ({
    maxWidth: "100px",
    [`@media(max-width: ${rightNavBreakpoint})`]: {
        display: "none",
    },
    "& img": {
        width: "100%",
    },
}));

const IconButtonNarrowScreen = styled(IconButton)(({ theme }) => ({
    margin: "auto",
    [`@media(min-width: ${rightNavBreakpoint})`]: {
        display: "none !important",
    },
}));

function PatreonButton() {
    return (
        <VeritcalCenterGrid item>
            <FixSizedButton
                component="a"
                href={patreonLink}
                target="_blank"
                rel="noreferrer noopener"
            >
                <img src={patreonWordmark} alt="Patreon" />
            </FixSizedButton>
            <IconButtonNarrowScreen
                component="a"
                href={patreonLink}
                target="_blank"
                rel="noreferrer noopener"
                style={{}}
            >
                <img src={patreonLogo} alt="Patreon" />
            </IconButtonNarrowScreen>
        </VeritcalCenterGrid>
    );
}

function RightNavItems({ VeritcalCenterGrid }) {
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
                            <PatreonButton />
                            <RightNavItems
                                VeritcalCenterGrid={
                                    VeritcalCenterGridWideScreen
                                }
                            />

                            <VeritcalCenterGridNarrowScreen item>
                                <IconButton
                                    color="inherit"
                                    onClick={() => setOpen(!open)}
                                >
                                    <MoreHorizIcon fontSize="large" />
                                </IconButton>
                            </VeritcalCenterGridNarrowScreen>
                            <Drawer
                                open={open}
                                onClose={() => setOpen(false)}
                                anchor="right"
                            >
                                <Grid container direction="column">
                                    <RightNavItems
                                        VeritcalCenterGrid={
                                            VeritcalCenterGridNarrowScreen
                                        }
                                    />
                                </Grid>
                            </Drawer>
                        </ExtendedNavGrid>
                    </TallGrid>
                </TallGrid>
                <Divider />
            </HeaderElement>
        </HeaderContainer>
    );
}

export default React.memo(Header);
