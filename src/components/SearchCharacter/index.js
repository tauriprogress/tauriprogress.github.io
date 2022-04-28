import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/styles";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

import { getRealmNames } from "../../helpers";

import { navigationToggle, pushToHistory } from "../../redux/actions";

import { navBreakpoint } from "../../redux/navigation/reducer";

import { environmentRealmsSelector } from "../../redux/selectors";

const SelectRealm = styled(Select)({
    width: "100%",
});

const GridItem = styled(Grid)(({ theme }) => ({
    width: "100%",
    marginTop: theme.spacing(1),
}));

function SearchCharacter() {
    const [character, setCharacter] = useState("");
    const realmNames = useSelector(environmentRealmsSelector);
    const realms = getRealmNames(realmNames);
    const [realm, setRealm] = useState(realms[Object.keys(realms)[0]]);
    const dispatch = useDispatch();

    useEffect(() => {
        const realms = getRealmNames(realmNames);
        setRealm((currentRealm) => {
            if (realms[Object.keys(realms)[0]] !== currentRealm) {
                return realms[Object.keys(realms)[0]];
            }

            return currentRealm;
        });
    }, [realmNames]);

    function submit() {
        if (character) {
            if (window.innerWidth < navBreakpoint) {
                dispatch(navigationToggle(false));
            }

            dispatch(pushToHistory(`/character/${character}?realm=${realm}`));
        }
    }

    return (
        <Grid container direction="column">
            <GridItem item>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submit();
                    }}
                >
                    <TextField
                        id="name"
                        label="Search character"
                        value={character}
                        fullWidth
                        onChange={(e) => setCharacter(e.target.value)}
                    />
                </form>
            </GridItem>
            {realms.length > 1 && (
                <GridItem item>
                    <FormControl fullWidth>
                        <InputLabel>Realm</InputLabel>
                        <SelectRealm
                            label="Realm"
                            value={realm}
                            onChange={(e) => setRealm(e.target.value)}
                            inputProps={{
                                name: "realm",
                                id: "realm",
                            }}
                        >
                            {realms.map((realmName) => (
                                <MenuItem key={realmName} value={realmName}>
                                    {realmName}
                                </MenuItem>
                            ))}
                        </SelectRealm>
                    </FormControl>
                </GridItem>
            )}
            <GridItem item>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={submit}
                >
                    search character
                </Button>
            </GridItem>
        </Grid>
    );
}

export default SearchCharacter;
