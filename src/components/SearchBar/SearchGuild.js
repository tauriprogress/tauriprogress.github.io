import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { withRouter } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { guildsFetch, navToggle } from "../../redux/actions";

function SearchGuild({ closeDrawer, history }) {
    const guilds = useSelector(state => {
        if (!state.guildList.data) {
            return [];
        }

        return state.guildList.data.map(guild => ({
            label: guild.guildName,
            value: {
                guildName: guild.guildName,
                realm: guild.realm
            }
        }));
    });

    const [guild, setGuild] = useState("");

    const dispatch = useDispatch();

    function submit() {
        if (guild) {
            history.push(
                `/guild/${guild.value.guildName}?realm=${guild.value.realm}`
            );
            dispatch(navToggle(false));
            closeDrawer();
        }
    }

    useEffect(() => {
        dispatch(guildsFetch());
    }, []);

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                submit();
            }}
        >
            <Grid container direction="column">
                <Grid item>
                    <Autocomplete
                        options={guilds}
                        autoHighlight
                        getOptionLabel={guild => guild.value.guildName}
                        renderOption={guild => (
                            <span>{guild.value.guildName}</span>
                        )}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label="Search guild"
                                fullWidth
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: "disabled"
                                }}
                            />
                        )}
                        onChange={(e, guild) => setGuild(guild)}
                    />
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
                            Search guild
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
}

export default withRouter(SearchGuild);
