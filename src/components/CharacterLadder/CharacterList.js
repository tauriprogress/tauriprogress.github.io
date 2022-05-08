import React from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import LogLink from "../LogLink";
import CharacterName from "../CharacterName";
import { shortNumber } from "../../helpers";

import Talents from "../Talents";
import { styled } from "@mui/system";
import Trinket from "../Trinket";

const NoWrap = styled("span")({
    whiteSpace: "nowrap",
});

function CharacterList({ data = [], combatMetric = "dps" }) {
    return data.map((char, index) => {
        return (
            <TableRow key={index} hover>
                <TableCell padding="checkbox" align="right">
                    <Typography>{char.rank}.</Typography>
                </TableCell>
                <TableCell>
                    <NoWrap>
                        {char.ilvl}{" "}
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
                <TableCell>{char.talents && <Talents char={char} />}</TableCell>

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
            </TableRow>
        );
    });
}

export default React.memo(CharacterList);
