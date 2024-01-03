import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import WithRealm from "../WithRealm";

import { guildListFetch } from "../../redux/actions";

import { navigationToggle, pushToHistory } from "../../redux/actions";

import { navBreakpoint } from "../../redux/navigation/reducer";

import { guildListDataSelector } from "../../redux/selectors";
import { withRealmGroupName } from "../Router/withRealmGroupName";

import { styled } from "@mui/material";

const Container = styled("form")({
    width: "100%",
});

const GridItem = styled(Grid)(({ theme }) => ({
    width: "100%",
    marginTop: theme.spacing(1),
}));

function SearchGuild({ realmGroupName }) {
    const guildList = useSelector(guildListDataSelector);

    const guilds = guildList
        ? guildList.map((guild) => ({
              name: guild.name,
              realm: guild.realm,
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
                pushToHistory({
                    path: `/guild/${guild.name}?realm=${guild.realm}`,
                })
            );
        }
    }

    useEffect(() => {
        setGuild(null);
        dispatch(guildListFetch(realmGroupName));
    }, [realmGroupName, dispatch]);

    return (
        <Container
            onSubmit={(e) => {
                e.preventDefault();
                submit();
            }}
        >
            <Grid container direction="column">
                <GridItem item>
                    <Autocomplete
                        options={guilds}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search guild"
                                fullWidth
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: "disabled",
                                }}
                            />
                        )}
                        getOptionLabel={(guild) => guild.name}
                        onChange={(e, guild) => setGuild(guild)}
                        isOptionEqualToValue={(option, value) =>
                            option.name === value.name &&
                            option.realm === value.realm
                        }
                        renderOption={(props, guild) => (
                            <li {...props} key={`${guild.name}${guild.realm}`}>
                                <WithRealm realmName={guild.realm}>
                                    {guild.name}
                                </WithRealm>
                            </li>
                        )}
                    />
                </GridItem>
                <GridItem item>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={submit}
                    >
                        Search guild
                    </Button>
                </GridItem>
            </Grid>
        </Container>
    );
}

export default withRealmGroupName(React.memo(SearchGuild));
