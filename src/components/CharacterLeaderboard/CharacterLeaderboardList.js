import React from "react";
import { useSelector } from "react-redux";

import { Avatar, useTheme } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { getClassImg, getFactionImg } from "../../helpers";
import CharacterName from "../CharacterName";

import { environmentCharacterClassNamesSelector } from "../../redux/selectors";

function CharacterLeaderboardList({ data = [] }) {
    const theme = useTheme();
    const characterClassNames = useSelector(
        environmentCharacterClassNamesSelector
    );

    return data.map((char, index) => {
        const realmName = char.realm;
        return (
            <TableRow key={index} hover>
                <TableCell align="right" padding="checkbox">
                    {char.rank}.
                </TableCell>
                <TableCell padding="checkbox">
                    <Typography color="inherit">
                        <CharacterName
                            character={char}
                            realmName={realmName}
                            specIcon={getClassImg(char.class)}
                            specIconTitle={characterClassNames[char.class]}
                        />
                    </Typography>
                </TableCell>
                <TableCell>{Math.floor(char.score)}</TableCell>
                <TableCell>{char.ilvl}</TableCell>
                <TableCell>
                    <Avatar src={getFactionImg(char.f)} />
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

export default React.memo(CharacterLeaderboardList);
