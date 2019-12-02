import { realms } from "tauriprogress-constants";
import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import { navToggle } from "../../redux/actions";

let realmNames = [];
for (let realmKey in realms) {
    realmNames.push(realms[realmKey]);
}

function SearchPlayer({ closeDrawer, history }) {
    const [player, setPlayer] = useState("");
    const [realm, setRealm] = useState(realms[Object.keys(realms)[0]]);
    const dispatch = useDispatch();

    function submit() {
        if (player) {
            history.push(`/player/${player}?realm=${realm}`);
            dispatch(navToggle(false));
            closeDrawer();
        }
    }

    return (
        <Grid container direction="column" style={{ marginTop: "16px" }}>
            <Grid item>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        submit();
                    }}
                >
                    <TextField
                        id="name"
                        label="Search player"
                        value={player}
                        fullWidth
                        onChange={e => setPlayer(e.target.value)}
                    />
                </form>
            </Grid>
            <Grid item style={{ marginTop: "4px" }}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="realm">Realm</InputLabel>
                    <Select
                        value={realm}
                        onChange={e => setRealm(e.target.value)}
                        inputProps={{
                            name: "realm",
                            id: "realm"
                        }}
                    >
                        {realmNames.map(realmName => (
                            <MenuItem key={realmName} value={realmName}>
                                {realmName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item>
                <Grid
                    container
                    justify="flex-end"
                    style={{
                        display: "flex",
                        marginTop: "8px"
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submit}
                    >
                        search player
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default withRouter(SearchPlayer);
