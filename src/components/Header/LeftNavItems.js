import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { TallGrid, VeritcalCenterGrid, rightNavBreakpoint } from "./";
import { push } from "connected-react-router";

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
import { getRealmGroupsMetaData, getExpansionImg } from "../../helpers";

import { styled } from "@mui/system";
import { Avatar } from "@mui/material";

const SeasonButton = styled(Button)(({ theme }) => ({
    padding: 10,
    height: "100%",
    fontSize: `${18 / 16}rem`,
    position: "relative",
    color: theme.palette.secondary.main,
    "& :hover": {
        color: theme.palette.secondary.main,
    },
    [`@media(max-width: ${rightNavBreakpoint})`]: {
        maxWidth: "30px !important",
    },
}));

const DisabledSpan = styled("span")(({ theme }) => ({
    color: theme.palette.text.disabled,
    display: "flex",
    maxWidth: "100%",
}));

const Span = styled("span")({
    display: "flex",
    maxWidth: "100%",
});

const ButtonText = styled("span")({
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "200px",
    whiteSpace: "pre",
});

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
        <TallGrid container wrap="nowrap" style={{ maxWidth: "100%" }}>
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
                <FormControl>
                    <InputLabel>Server</InputLabel>
                    <Select
                        value={realmGroup}
                        label={"Server"}
                        onChange={(e) => {
                            dispatch(push("/"));
                            dispatch(environmentSetRealmGroup(e.target.value));
                        }}
                    >
                        {getRealmGroupsMetaData().map((realmGroupMetaData) => (
                            <MenuItem
                                value={realmGroupMetaData.label}
                                key={realmGroupMetaData.label}
                            >
                                <Avatar
                                    src={getExpansionImg(
                                        realmGroupMetaData.expansion
                                    )}
                                />
                                {realmGroupMetaData.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </VeritcalCenterGrid>
            {hasSeasonal && (seasonName || nextSeasonName) && (
                <VeritcalCenterGrid item style={{ maxWidth: "100%" }}>
                    <SeasonButton onClick={seasonalSwitch}>
                        {(() => {
                            const Component = isSeasonal ? Span : DisabledSpan;
                            let name = seasonName || nextSeasonName;

                            return (
                                <Component>
                                    {name.split(" ").map((text) => (
                                        <ButtonText key={text}>
                                            {text}{" "}
                                        </ButtonText>
                                    ))}
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
