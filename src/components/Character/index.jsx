import queryString from "query-string";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { validateRealm } from "../Router/validateRealm";

import Grid from "@mui/material/Grid";

import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import Page from "../Page";
import SelectRealm from "../SelectRealm";
import CharacterItems from "./CharacterItems";
import CharacterProgression from "./CharacterProgression";
import CharacterRecentKills from "./CharacterRecentKills";
import CharacterStats from "./CharacterStats";
import CharacterTitle from "./CharacterTitle";

import { characterDataFetch } from "../../redux/actions";

import { useLocation, useRouteMatch } from "react-router-dom";
import { capitalize } from "../../helpers";
import {
    characterDataErrorSelector,
    characterDataLoadingSelector,
} from "../../redux/selectors";

import { styled } from "@mui/material";

const GridContainer = styled(Grid)(({ theme }) => ({
    margin: "10px auto",
    maxWidth: "1300px",
}));

const ProgContainer = styled(Grid)(({ theme }) => ({
    flex: 1,
    maxWidth: "650px",
}));

function Character() {
    const location = useLocation();
    const match = useRouteMatch();
    const characterName = match.params.characterName;
    const realm = queryString.parse(location.search).realm;

    const { loading, error } = useSelector(
        (state) => ({
            loading: characterDataLoadingSelector(state),
            error: characterDataErrorSelector(state),
        }),
        shallowEqual
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(characterDataFetch({ characterName: characterName, realm }));
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
                            refresh={
                                error !== "Character not found."
                                    ? () =>
                                          dispatch(
                                              characterDataFetch({
                                                  characterName: characterName,
                                                  realm,
                                              })
                                          )
                                    : false
                            }
                        />
                        {error === "Character not found." && <SelectRealm />}
                    </React.Fragment>
                ) : loading ? (
                    <Loading />
                ) : (
                    <React.Fragment>
                        <CharacterTitle />
                        <GridContainer container justifyContent="space-around">
                            <Grid item>
                                <CharacterStats />
                            </Grid>
                            <ProgContainer item>
                                <CharacterProgression />
                            </ProgContainer>
                            <Grid item>
                                <CharacterItems />
                            </Grid>
                        </GridContainer>
                        <CharacterRecentKills />
                    </React.Fragment>
                )}
            </section>
        </Page>
    );
}

export default validateRealm()(
    React.memo(Character, (prevProps, nextProps) => {
        return JSON.stringify(prevProps) === JSON.stringify(nextProps);
    })
);
