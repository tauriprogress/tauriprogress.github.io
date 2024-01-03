import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import Typography from "@mui/material/Typography";

import { styled } from "@mui/material";
import { characterRecentKillsFetch } from "../../redux/actions";
import {
    characterNameSelector,
    characterRealmSelector,
    characterRecentKillsEntireSelector,
} from "../../redux/selectors";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import RecentKills from "../RecentKills";

const Container = styled("div")(({ theme }) => ({
    padding: `${theme.spacing(4)} ${theme.spacing(1)}`,
}));

const CustomRecentKills = styled(RecentKills)(({ theme }) => ({
    maxWidth: "500px",
    margin: "auto",
}));

function CharacterRecentKills({ classes }) {
    const dispatch = useDispatch();
    const { loading, error, data, realm, characterName } = useSelector(
        (state) => ({
            ...characterRecentKillsEntireSelector(state),
            realm: characterRealmSelector(state),
            characterName: characterNameSelector(state),
        }),
        shallowEqual
    );

    const logs = data ? data.logs : [];

    return (
        <Container>
            <CustomRecentKills logs={logs} realm={realm}>
                <Typography variant="h6">Recent Kills</Typography>
                {(() => {
                    if (loading) {
                        return <Loading />;
                    } else if (error) {
                        return (
                            <ErrorMessage
                                message={error}
                                refresh={() =>
                                    dispatch(
                                        characterRecentKillsFetch({
                                            characterName,
                                            realm,
                                        })
                                    )
                                }
                            />
                        );
                    } else if (!logs.length) {
                        return <Typography>No data</Typography>;
                    } else {
                        return null;
                    }
                })()}
            </CustomRecentKills>
        </Container>
    );
}

export default CharacterRecentKills;
