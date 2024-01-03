import React from "react";

import { shallowEqual, useSelector } from "react-redux";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

import { getFactionImg } from "../../helpers";

import {
    guildNameSelector,
    guildFactionSelector,
    guildMembersCountSelector,
    guildRealmSelector,
} from "../../redux/guild/selectors";
import { environmentArmoryUrlSelector } from "../../redux/selectors";

import { styled, useTheme } from "@mui/material";

const Container = styled(Grid)(({ theme }) => ({
    padding: `0 ${theme.spacing(1)}`,
    marginBottom: theme.spacing(1),
    textAlign: "left",
}));

const Emblem = styled("img")(({ theme }) => ({
    height: "70px",
    margin: `0 ${theme.spacing(1)}`,
}));

const NoWrap = styled("span")({
    whiteSpace: "nowrap",
});

function GuildTitle() {
    const {
        palette: { factionColors },
    } = useTheme();
    const { name, faction, membersCount, realm, armoryUrl } = useSelector(
        (state) => ({
            name: guildNameSelector(state),
            faction: guildFactionSelector(state),
            membersCount: guildMembersCountSelector(state),
            realm: guildRealmSelector(state),
            armoryUrl: environmentArmoryUrlSelector(state),
        }),
        shallowEqual
    );

    const emblem = getFactionImg(faction);

    const factionColor =
        faction === 0 ? factionColors.alliance : factionColors.horde;

    return (
        <Container container wrap="nowrap">
            <Grid item>
                <Emblem src={emblem} alt="faction emblem" />
            </Grid>
            <Grid item>
                <Typography variant="h4">
                    {armoryUrl ? (
                        <Link
                            target="_blank"
                            href={`https://tauriwow.com/armory#guild-info.xml?r=${realm}&gn=${name}`}
                            rel="noopener noreferrer"
                            style={{
                                color: factionColor,
                            }}
                        >
                            {name}
                        </Link>
                    ) : (
                        <span
                            style={{
                                color: factionColor,
                            }}
                        >
                            {name}
                        </span>
                    )}
                </Typography>
                <Typography color="text.secondary">
                    <NoWrap>{realm}</NoWrap>
                    <br />
                    {faction ? "Horde" : "Alliance"},{" "}
                    <NoWrap>{membersCount} members</NoWrap>
                </Typography>
            </Grid>
        </Container>
    );
}

export default GuildTitle;
