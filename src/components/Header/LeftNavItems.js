import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { Link as RouterLink } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

import { TallGrid, VeritcalCenterGrid } from "./";

import {
    navigationToggle,
    environmentSetRealmGroup,
    environmentToggleSeason,
} from "../../redux/actions";

import {
    environmentIsSeasonalSelector,
    environmentNextSeasonNameSelector,
    environmentSeasonNameSelector,
    environmentRealmGroupSelector,
    environmentHasSeasonalSelector,
} from "../../redux/selectors";

import wotlkIcon from "../../assets/expansionIcon/wotlk.png";
import mopIcon from "../../assets/expansionIcon/mop.png";
import { styled } from "@mui/system";

const ExpansionIcon = styled("img")({
    height: "32px !important",
    width: "32px !important",
});

const SeasonButton = styled(Button)(({ theme }) => ({
    padding: 10,
    height: "100%",
    fontSize: `${18 / 16}rem`,
    position: "relative",
    "& :hover": {
        color: theme.palette.text.primary,
    },
}));

const DisabledSpan = styled("span")(({ theme }) => ({
    color: theme.palette.text.disabled,
}));

function LeftNavItems() {
    const dispatch = useDispatch();
    const { realmGroup, hasSeasonal, seasonName, nextSeasonName, isSeasonal } =
        useSelector(
            (state) => ({
                realmGroup: environmentRealmGroupSelector(state),
                hasSeasonal: environmentHasSeasonalSelector(state),
                seasonName: environmentSeasonNameSelector(state),
                nextSeasonName: environmentNextSeasonNameSelector(state),
                isSeasonal: environmentIsSeasonalSelector(state),
            }),
            shallowEqual
        );

    function seasonalSwitch() {
        if (hasSeasonal) {
            dispatch(environmentToggleSeason());
        }
    }

    return (
        <TallGrid container>
            <VeritcalCenterGrid item>
                <IconButton
                    color="inherit"
                    onClick={() => dispatch(navigationToggle())}
                    size="large"
                >
                    <MenuIcon fontSize="large" />
                </IconButton>
            </VeritcalCenterGrid>

            <VeritcalCenterGrid item>
                <Tooltip
                    title={
                        realmGroup === "tauri"
                            ? "Switch to WOTLK"
                            : "Switch to MOP"
                    }
                >
                    <IconButton
                        size="large"
                        component={RouterLink}
                        to={`/`}
                        onClick={() =>
                            dispatch(
                                environmentSetRealmGroup(
                                    realmGroup === "tauri"
                                        ? "crystalsong"
                                        : "tauri"
                                )
                            )
                        }
                    >
                        <ExpansionIcon
                            src={realmGroup === "tauri" ? mopIcon : wotlkIcon}
                            alt={`Expansion ${
                                realmGroup === "tauri" ? "MOP" : "WOTLK"
                            }`}
                        />
                    </IconButton>
                </Tooltip>
            </VeritcalCenterGrid>
            {hasSeasonal && (seasonName || nextSeasonName) && (
                <VeritcalCenterGrid item>
                    <SeasonButton onClick={seasonalSwitch}>
                        {(() => {
                            const Component = isSeasonal
                                ? "span"
                                : DisabledSpan;

                            return (
                                <Component
                                    data-text={seasonName || nextSeasonName}
                                >
                                    {seasonName || nextSeasonName}
                                </Component>
                            );
                        })()}
                    </SeasonButton>
                </VeritcalCenterGrid>
            )}
        </TallGrid>
    );
}

export default LeftNavItems;
