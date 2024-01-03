import React from "react";
import { useDispatch } from "react-redux";

import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { TallGrid, VeritcalCenterGrid } from "./";

import { navigationToggle, pushToHistory } from "../../redux/actions";

import { getRealmGroupsMetaData, getExpansionImg } from "../../helpers";

import { Avatar } from "@mui/material";
import { changeRealmGroupName } from "../../redux/realmGroupName/actions";
import { withRealmGroupName } from "../Router/withRealmGroupName";

function LeftNavItems({ realmGroupName }) {
    const dispatch = useDispatch();

    function changeRealmGroup(realmGroup) {
        dispatch(
            pushToHistory({
                path: "/",
                realmGroupName: realmGroup,
            })
        );
        dispatch(changeRealmGroupName(realmGroup));
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
                        value={realmGroupName}
                        label={"Server"}
                        onChange={(e) => {
                            changeRealmGroup(e.target.value);
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
        </TallGrid>
    );
}

export default withRealmGroupName(React.memo(LeftNavItems));
