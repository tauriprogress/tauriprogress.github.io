import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { withRouter } from "react-router-dom";
import withStyles from '@mui/styles/withStyles';

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Autocomplete from '@mui/material/Autocomplete';

import { guildListFetch } from "../../redux/actions";

import { navigationToggle, pushToHistory } from "../../redux/actions";

import { navBreakpoint } from "../../redux/navigation/reducer";

import {
    guildListDataSelector,
    environmentRealmGroupSelector,
    environmentIsSeasonalSelector
} from "../../redux/selectors";

function styles() {
    return {
        container: {
            width: "100%"
        }
    };
}

function SearchGuild({ classes }) {
    const { guildList, realmGroup, isSeasonal } = useSelector(state => {
        return {
            guildList: guildListDataSelector(state),
            realmGroup: environmentRealmGroupSelector(state),
            isSeasonal: environmentIsSeasonalSelector(state)
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
                dispatch(navigationToggle(false));
            }

            dispatch(
                pushToHistory(`/guild/${guild.name}?realm=${guild.realm}`)
            );
        }
    }

    useEffect(() => {
        setGuild(null);
        dispatch(guildListFetch(realmGroup));
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
                        isOptionEqualToValue={(option, value) =>
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
