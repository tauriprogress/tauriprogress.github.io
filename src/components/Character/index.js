import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import validateRealm from "../Router/validateRealm";

import Grid from "@material-ui/core/Grid";

import Loading from "../Loading";
import CharacterTitle from "./CharacterTitle";
import CharacterStats from "./CharacterStats";
import CharacterProgression from "./CharacterProgression";
import CharacterRecentKills from "./CharacterRecentKills";
import CharacterItems from "./CharacterItems";
import SelectRealm from "../SelectRealm";
import ErrorMessage from "../ErrorMessage";

import { fetchCharacterData } from "../../redux/actions";

import { getRealmFromLocation } from "../../helpers";

function styles() {
    return {
        gridContainer: { margin: "10px auto", maxWidth: "1300px" },
        progContainer: { flex: 1, maxWidth: "650px" }
    };
}

function Player({ classes, match, location }) {
    const characterName = match.params.characterName;
    const realm = getRealmFromLocation(location);
    const { loading, error } = useSelector(state => state.character.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCharacterData({ characterName: characterName, realm }));
    }, [characterName, realm]);

    return (
        <section>
            {error ? (
                <React.Fragment>
                    <ErrorMessage message={error} />
                    {error === "character not found" && <SelectRealm />}
                </React.Fragment>
            ) : loading ? (
                <Loading />
            ) : (
                <React.Fragment>
                    <CharacterTitle />
                    <Grid
                        container
                        className={classes.gridContainer}
                        justify="space-around"
                    >
                        <Grid item>
                            <CharacterStats />
                        </Grid>
                        <Grid item className={classes.progContainer}>
                            <CharacterProgression />
                        </Grid>
                        <Grid item>
                            <CharacterItems />
                        </Grid>
                    </Grid>
                    <CharacterRecentKills />
                </React.Fragment>
            )}
        </section>
    );
}

export default withStyles(styles)(validateRealm()(Player));
