import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { guildsFetch } from "../../redux/actions";

import { toggleNavigation } from "../../redux/actions";

import { navBreakpoint } from "../../redux/reducers/navigationReducer";
import { pushToHistory } from "../../helpers";

function styles() {
    return {
        container: {
            width: "100%"
        }
    };
}

function SearchGuild({ classes, history }) {
    const { guildList, realmGroup, isSeasonal } = useSelector(state => {
        return {
            guildList: state.guildList.data,
            realmGroup: state.environment.realmGroup,
            isSeasonal: state.environment.seasonal.isSeasonal
        };
    }, shallowEqual);

    const guilds = guildList
        ? guildList.map(guild => ({
              name: guild.name,
              realm: guild.realm
          }))
        : [];

    const [guild, setGuild] = useState(null);

    const dispatch = useDispatch();

    function submit() {
        if (guild) {
            if (window.innerWidth < navBreakpoint) {
                dispatch(toggleNavigation(false));
            }

            pushToHistory(history, `/guild/${guild.name}?realm=${guild.realm}`);
        }
    }

    useEffect(() => {
        setGuild(null);
        dispatch(guildsFetch(realmGroup));
    }, [isSeasonal, realmGroup, dispatch]);

    return (
        <form
            className={classes.container}
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
                        getOptionLabel={guild => guild.name}
                        renderOption={guild => <span>{guild.name}</span>}
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
                        getOptionSelected={(option, value) =>
                            option.name === value.name &&
                            option.realm === value.realm
                        }
                    />
                </Grid>
                <Grid item>
                    <Grid
                        container
                        justifyContent="flex-end"
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

export default withRouter(withStyles(styles)(SearchGuild));
