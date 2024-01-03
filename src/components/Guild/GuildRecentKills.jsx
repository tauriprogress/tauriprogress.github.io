import React from "react";

import RecentKills from "../RecentKills";
import Typography from "@mui/material/Typography";
import { shallowEqual, useSelector } from "react-redux";

import {
    guildProgressionLatestKillsSelector,
    guildRealmSelector,
} from "../../redux/guild/selectors";
import { styled } from "@mui/material";

const Container = styled("div")(({ theme }) => ({
    maxWidth: "600px",
    margin: "auto",
    padding: `${theme.spacing(3)} ${theme.spacing(1)}`,
}));

function GuildLastestKills() {
    const { recentKills, realm } = useSelector(
        (state) => ({
            recentKills: guildProgressionLatestKillsSelector(state),
            realm: guildRealmSelector(state),
        }),
        shallowEqual
    );

    return (
        <Container>
            <RecentKills logs={recentKills} realm={realm}>
                <Typography variant="h6">Recent Kills</Typography>
            </RecentKills>
        </Container>
    );
}

export default GuildLastestKills;
