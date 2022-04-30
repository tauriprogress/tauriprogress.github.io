import React, { useState } from "react";

import withTheme from "@mui/styles/withTheme";
import { shallowEqual, useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

import FilterContainer from "../FilterContainer";
import CharacterName from "../CharacterName";
import OverflowScroll from "../OverflowScroll";

import { filterMembers } from "./helpers";
import { getClassImg } from "../../helpers";
import {
    guildRealmSelector,
    guildRanksSelector,
    environmentCharacterClassNamesSelector,
} from "../../redux/selectors";
import { styled } from "@mui/system";

const Container = styled("div")({
    minHeight: "550px",
});

const NameTextField = styled(TextField)({
    padding: "0px",
    width: "120px",
});

function GuildRosterList({ theme, members, classInfo }) {
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
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Rank</TableCell>
                            <TableCell>Level</TableCell>
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
                                    <TableCell>
                                        <Typography>{member.lvl}</Typography>
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

export default withTheme(GuildRosterList);
