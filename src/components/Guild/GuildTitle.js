import React from "react";
import { useSelector } from "react-redux";

import { withTheme } from "@material-ui/core/styles";

import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

function GuildTitle({ theme }) {
    const { guildName, guildMembersCount, realm, gFaction } = useSelector(
        state => state.guild.data
    );

    if (!guildName) {
        return <div />;
    }

    const {
        palette: { factionColors }
    } = theme;

    return (
        <Container style={{ textAlign: "center", marginBottom: "10px" }}>
            <Typography variant="h4">
                <Link
                    href={`https://tauriwow.com/armory#guild-info.xml?r=${realm}&gn=${guildName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color:
                            gFaction === 0
                                ? factionColors.alliance
                                : factionColors.horde
                    }}
                >
                    {guildName}
                </Link>
            </Typography>
            <Typography variant="caption" color="textSecondary">
                {realm}
            </Typography>
            <br />
            <Typography variant="caption" color="textSecondary">
                {guildMembersCount} members
            </Typography>
        </Container>
    );
}

export default withTheme(GuildTitle);
