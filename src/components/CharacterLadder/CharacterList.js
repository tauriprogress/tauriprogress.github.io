import React from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import LogLink from "../LogLink";
import DateTooltip from "../DateTooltip";
import DisplayDate from "../DisplayDate";
import CharacterName from "../CharacterName";
import { shortNumber } from "../../helpers";

import Talents from "../Talents";
import { styled } from "@mui/system";

const NoWrap = styled("span")({
    whiteSpace: "nowrap",
});

function CharacterList({ data = [], combatMetric = "dps" }) {
    return data.map((char, index) => {
        const date = new Date(char.date * 1000);
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
                    <DateTooltip date={date}>
                        <DisplayDate date={date} align="right" />
                    </DateTooltip>
                </TableCell>
            </TableRow>
        );
    });
}

export default React.memo(CharacterList);
