import React, { useState } from "react";

import { shallowEqual, useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import CharacterName from "../CharacterName";
import FilterContainer from "../FilterContainer";
import OverflowScroll from "../OverflowScroll";

import { Avatar, styled } from "@mui/material";
import { getClassImg } from "../../helpers";
import {
    environmentCharacterClassNamesSelector,
    guildRanksSelector,
    guildRealmSelector,
} from "../../redux/selectors";
import { filterMembers } from "./helpers";
import { useTheme } from "@emotion/react";

const Container = styled("div")({
    minHeight: "550px",
});

const NameTextField = styled(TextField)({
    padding: "0px",
    width: "120px",
});

function GuildRosterList({ members, classInfo }) {
    const theme = useTheme();
    const rowsPerPage = 10;
    const { realm, characterClassNames, ranks } = useSelector(
        (state) => ({
            realm: guildRealmSelector(state),
            characterClassNames: environmentCharacterClassNamesSelector(state),
            ranks: guildRanksSelector(state),
        }),
        shallowEqual
    );

    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState({
        name: "",
        rankName: "",
        class: "",
    });
    const filteredMembers = filterMembers(members, filter);

    function changeFilter(filter) {
        if (page > 0) {
            setPage(0);
        }
        setFilter(filter);
    }

    return (
        <Container>
            <FilterContainer>
                <NameTextField
                    id="name"
                    label="Name"
                    value={filter.name}
                    onChange={(e) =>
                        changeFilter({
                            ...filter,
                            name: e.target.value,
                        })
                    }
                />

                <FormControl>
                    <InputLabel>Class</InputLabel>
                    <Select
                        label={"Class"}
                        value={filter.class}
                        onChange={(e) =>
                            changeFilter({
                                ...filter,
                                class: e.target.value,
                            })
                        }
                        style={{
                            color:
                                filter.class !== "" &&
                                theme.palette.classColors[filter.class].text,
                        }}
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {classInfo.map((charClass) => (
                            <MenuItem
                                key={charClass.classId}
                                value={charClass.classId}
                                style={{
                                    color: theme.palette.classColors[
                                        charClass.classId
                                    ].text,
                                }}
                            >
                                <Avatar
                                    src={getClassImg(charClass.classId)}
                                    variant="small"
                                />
                                {characterClassNames[charClass.classId]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel>Rank</InputLabel>
                    <Select
                        label={"Rank"}
                        value={filter.rankName}
                        onChange={(e) =>
                            changeFilter({
                                ...filter,
                                rankName: e.target.value,
                            })
                        }
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {ranks.map((rank) => (
                            <MenuItem key={rank} value={rank}>
                                {rank}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </FilterContainer>
            <OverflowScroll>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right" padding="checkbox">
                                Level
                            </TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Rank</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredMembers
                            .sort((a, b) => {
                                const aRank = ranks.indexOf(a.rankName);
                                const bRank = ranks.indexOf(b.rankName);

                                return (
                                    (aRank > -1 ? aRank : 30) -
                                    (bRank > -1 ? bRank : 30)
                                );
                            })
                            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                            .map((member) => (
                                <TableRow key={member.name}>
                                    <TableCell align="right" padding="checkbox">
                                        {member.lvl}
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            <CharacterName
                                                character={member}
                                                specIcon={getClassImg(
                                                    member.class
                                                )}
                                                specIconTitle={
                                                    characterClassNames[
                                                        member.class
                                                    ] || ""
                                                }
                                                realmName={realm}
                                            />
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {member.rankName}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </OverflowScroll>
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={filteredMembers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    "aria-label": "Previous Page",
                }}
                nextIconButtonProps={{
                    "aria-label": "Next Page",
                }}
                onPageChange={(e, page) => setPage(page)}
            />
        </Container>
    );
}

export default GuildRosterList;
