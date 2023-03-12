import React from "react";

import { useSelector } from "react-redux";

import Grid from "@mui/material/Grid";

import GuildBossKillsChart from "./GuildBossKillsChart";

import { guildRaidDaysSelector } from "../../redux/guild/selectors";

import { styled } from "@mui/material";

const Container = styled("section")(({ theme }) => ({
    padding: `${theme.spacing(2)} 0 ${theme.spacing(4)}`,
}));

const ContentContainer = styled("div")(({ theme }) => ({
    maxWidth: "1000px",
    margin: "auto",
}));

function GuildBossKillsDays() {
    const raidDays = useSelector(guildRaidDaysSelector);

    return (
        <Container>
            <ContentContainer>
                <Grid container justifyContent="space-around">
                    <Grid item>
                        <GuildBossKillsChart
                            data={raidDays.latest}
                            title={"Recent"}
                        />
                    </Grid>
                    <Grid item>
                        <GuildBossKillsChart
                            data={raidDays.total}
                            title={"All"}
                        />
                    </Grid>
                </Grid>
            </ContentContainer>
        </Container>
    );
}

export default GuildBossKillsDays;
