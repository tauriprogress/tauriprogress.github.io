import React from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { getFactionImg, shortNumber } from "../../helpers";
import CharacterName from "../CharacterName";
import LogLink from "../LogLink";
import Talents from "../Talents";
import Trinket from "../Trinket";

import { Avatar, styled, useTheme } from "@mui/material";

const NoWrap = styled("span")({
    whiteSpace: "nowrap",
});

function CharacterList({ data = [], combatMetric = "dps" }) {
    const theme = useTheme();
    return data.map((char, index) => {
        return (
            <TableRow key={index} hover>
                <TableCell padding="checkbox" align="right">
                    <Typography>{char.rank}.</Typography>
                </TableCell>
                <TableCell padding="checkbox">
                    <NoWrap>
                        <CharacterName
                            character={char}
                            realmName={char.realm}
                        />
                    </NoWrap>
                </TableCell>

                <TableCell>
                    <LogLink logId={char.logId} realm={char.realm}>
                        {shortNumber(char[combatMetric])}
                    </LogLink>
                </TableCell>

                <TableCell>{char.ilvl}</TableCell>

                <TableCell align="right">
                    {char.talents && <Talents char={char} />}
                </TableCell>

                <TableCell>
                    {char.trinkets &&
                        char.trinkets.map((trinket) => (
                            <Trinket
                                key={trinket.id}
                                id={trinket.id}
                                icon={trinket.icon}
                            />
                        ))}
                </TableCell>
                <TableCell>
                    <Avatar src={getFactionImg(char.f)} />{" "}
                    {!char.f ? (
                        <span
                            style={{
                                color: theme.palette.factionColors.alliance,
                            }}
                        >
                            Alliance
                        </span>
                    ) : (
                        <span
                            style={{
                                color: theme.palette.factionColors.horde,
                            }}
                        >
                            Horde
                        </span>
                    )}
                </TableCell>
            </TableRow>
        );
    });
}

export default React.memo(CharacterList);
