import React, { useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import { getRealmNames } from "../../helpers";

function styles() {
    return {
        container: {
            marginTop: "16px",
            width: "100%"
        },
        selectRealm: {
            width: "100%"
        },
        realm: {
            marginTop: "4px"
        },
        searchPlayerButtonContainer: {
            display: "flex",
            marginTop: "8px"
        }
    };
}

function SearchCharacter({ classes, history }) {
    const [character, setCharacter] = useState("");
    const realms = getRealmNames(
        useSelector(state => state.environment.realms)
    );
    const [realm, setRealm] = useState(realms[Object.keys(realms)[0]]);

    function submit() {
        if (character) {
            history.push(`/character/${character}?realm=${realm}`);
        }
    }

    return (
        <Grid container direction="column" className={classes.container}>
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
                        value={character}
                        fullWidth
                        onChange={e => setCharacter(e.target.value)}
                    />
                </form>
            </Grid>
            {realms.length > 1 && (
                <Grid item className={classes.realm}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="realm">Realm</InputLabel>
                        <Select
                            value={realm}
                            onChange={e => setRealm(e.target.value)}
                            inputProps={{
                                name: "realm",
                                id: "realm"
                            }}
                            classes={{ root: classes.selectRealm }}
                        >
                            {realms.map(realmName => (
                                <MenuItem key={realmName} value={realmName}>
                                    {realmName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            )}
            <Grid item>
                <Grid
                    container
                    justify="flex-end"
                    className={classes.searchPlayerButtonContainer}
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

export default withRouter(withStyles(styles)(SearchCharacter));
