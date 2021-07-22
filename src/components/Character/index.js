import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import queryString from "query-string";

import { withStyles } from "@material-ui/core/styles";

import validateRealm from "../Router/validateRealm";

import Grid from "@material-ui/core/Grid";

import Page from "../Page";
import Loading from "../Loading";
import CharacterTitle from "./CharacterTitle";
import CharacterStats from "./CharacterStats";
import CharacterProgression from "./CharacterProgression";
import CharacterRecentKills from "./CharacterRecentKills";
import CharacterItems from "./CharacterItems";
import SelectRealm from "../SelectRealm";
import ErrorMessage from "../ErrorMessage";

import { fetchCharacterData } from "../../redux/actions";

import { capitalize } from "../../helpers";

function styles() {
    return {
        gridContainer: { margin: "10px auto", maxWidth: "1300px" },
        progContainer: { flex: 1, maxWidth: "650px" }
    };
}

function Character({ classes, match, location }) {
    const characterName = match.params.characterName;
    const realm = queryString.parse(location.search).realm;

    const { loading, error } = useSelector(
        state => ({
            loading: state.character.data.loading,
            error: state.character.data.error
        }),
        shallowEqual
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCharacterData({ characterName: characterName, realm }));
    }, [characterName, realm, dispatch]);

    return (
        <Page
            title={`${capitalize(match.params.characterName)} | Tauri Progress`}
        >
            <section>
                {error ? (
                    <React.Fragment>
                        <ErrorMessage
                            message={error}
                            refresh={() =>
                                dispatch(
                                    fetchCharacterData({
                                        characterName: characterName,
                                        realm
                                    })
                                )
                            }
                        />
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
                            justifyContent="space-around"
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
        </Page>
    );
}

export default withStyles(styles)(validateRealm()(Character));
