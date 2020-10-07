import React, { useState } from "react";

import { withStyles, withTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import { Link as RouterLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

import FilterContainer from "../FilterContainer/CollapseableFilterContainer";
import SpecImg from "../SpecImg";
import OverflowScroll from "../OverflowScroll";

import { filterMembers } from "./helpers";
import { classImg } from "../../helpers";

function styles(theme) {
    return {
        container: {
            minHeight: "550px"
        },
        cell: {
            padding: theme.spacing(1)
        },
        classImg: {
            marginRight: "5px",
            height: "18px",
            width: "18px",
            transform: "translate(0, 4px)"
        },
        textField: {
            width: "124px",
            padding: "0px"
        }
    };
}

function GuildRosterList({ classes, theme, members, ranks, classInfo }) {
    const rowsPerPage = 10;
    const { realm, characterClassNames } = useSelector(state => ({
        realm: state.guild.data.realm,
        characterClassNames: state.environment.characterClassNames
    }));

    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState({
        name: "",
        rankName: "",
        class: ""
    });

    const filteredMembers = filterMembers(members, filter);

    return (
        <div className={classes.container}>
            <FilterContainer>
                <TextField
                    id="name"
                    label="Name"
                    value={filter.name}
                    onChange={e =>
                        setFilter({
                            ...filter,
                            name: e.target.value
                        })
                    }
                    className={classes.textField}
                />

                <FormControl>
                    <InputLabel htmlFor="class">Class</InputLabel>
                    <Select
                        value={filter.class}
                        onChange={e =>
                            setFilter({
                                ...filter,
                                class: e.target.value
                            })
                        }
                        style={{
                            color:
                                filter.class !== "" &&
                                theme.palette.classColors[filter.class].text
                        }}
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {classInfo.map(charClass => (
                            <MenuItem
                                key={charClass.classId}
                                value={charClass.classId}
                                style={{
                                    color:
                                        theme.palette.classColors[
                                            charClass.classId
                                        ].text
                                }}
                            >
                                <span>
                                    {characterClassNames[charClass.classId]}
                                </span>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="class">Rank</InputLabel>
                    <Select
                        value={filter.rankName}
                        onChange={e =>
                            setFilter({
                                ...filter,
                                rankName: e.target.value
                            })
                        }
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {ranks.map(rank => (
                            <MenuItem key={rank} value={rank}>
                                <span>{rank}</span>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </FilterContainer>
            <OverflowScroll>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell}>Name</TableCell>
                            <TableCell className={classes.cell}>Rank</TableCell>
                            <TableCell className={classes.cell}>
                                Level
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredMembers
                            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                            .map(member => (
                                <TableRow key={member.name}>
                                    <TableCell className={classes.cell}>
                                        <Typography>
                                            <SpecImg
                                                className={classes.classImg}
                                                title={
                                                    characterClassNames[
                                                        member.class
                                                    ]
                                                }
                                                src={classImg(member.class)}
                                            />
                                            <Link
                                                component={RouterLink}
                                                to={`/player/${member.name}?realm=${realm}`}
                                                style={{
                                                    color:
                                                        theme.palette
                                                            .classColors[
                                                            member.class
                                                        ].text
                                                }}
                                            >
                                                {member.name}
                                            </Link>
                                        </Typography>
                                    </TableCell>
                                    <TableCell className={classes.cell}>
                                        <Typography>
                                            {member.rankName}
                                        </Typography>
                                    </TableCell>
                                    <TableCell className={classes.cell}>
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
                    "aria-label": "Previous Page"
                }}
                nextIconButtonProps={{
                    "aria-label": "Next Page"
                }}
                onChangePage={(e, page) => setPage(page)}
            />
        </div>
    );
}

export default withStyles(styles)(withTheme(GuildRosterList));
