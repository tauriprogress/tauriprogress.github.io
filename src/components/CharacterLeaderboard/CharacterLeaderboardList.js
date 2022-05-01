import React from "react";
import { useSelector } from "react-redux";

import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { getClassImg, getFactionImg } from "../../helpers";
import { Avatar } from "@mui/material";
import withTheme from "@mui/styles/withTheme";
import CharacterName from "../CharacterName";

import { environmentCharacterClassNamesSelector } from "../../redux/selectors";

function CharacterLeaderboardList({ data = [], theme }) {
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
                <TableCell>
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

export default withTheme(React.memo(CharacterLeaderboardList));
