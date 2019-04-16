import { specs, specToClass, characterClasses } from "tauriprogress-constants";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Link as RouterLink } from "react-router-dom";

import { withTheme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { Typography } from "@material-ui/core";

import LogLink from "../LogLink";
import DateTooltip from "../DateTooltip";

import { charLadderFilterSet } from "../../redux/actions";

import { getSpecImg } from "../DisplayRaid/helpers";
import { applyFilter } from "./helpers";

class CharacterLadder extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                rowsPerPage: 50,
                currentPage: 0
            }
        };
        this.changePage = this.changePage.bind(this);
    }

    changePage(e, page) {
        this.setState({
            ...this.state,
            pagination: { ...this.state.pagination, currentPage: page }
        });
    }

    changeFilter(filterName, value) {
        if (filterName === "class") {
            this.props.charLadderFilterSet({
                ...this.props.filter,
                [filterName]: value,
                spec: ""
            });
        } else {
            this.props.charLadderFilterSet({
                ...this.props.filter,
                [filterName]: value
            });
        }
    }

    render() {
        const {
            type,
            filter,
            theme: {
                palette: { classColors }
            }
        } = this.props;
        const { pagination } = this.state;

        let classOptions = [];
        for (let classId in characterClasses) {
            classOptions.push({
                id: classId,
                label: characterClasses[classId]
            });
        }

        let specOptions = [];

        for (let specId in specToClass) {
            if (specToClass[specId] === Number(filter.class)) {
                specOptions.push({
                    id: specId,
                    label: specs[specId].label
                });
            }
        }

        let data = applyFilter(filter, this.props.data);

        return (
            <React.Fragment>
                <div className="characterLadderFilters">
                    <FormControl className="characterLadderFiltersFormControl">
                        <TextField
                            id="name"
                            label="Name"
                            value={filter.name}
                            onChange={e =>
                                this.changeFilter("name", e.target.value)
                            }
                            margin="normal"
                            className="characterLadderFiltersSearch"
                        />
                    </FormControl>

                    <FormControl className="characterLadderFiltersFormControl">
                        <InputLabel htmlFor="class">Class</InputLabel>
                        <Select
                            style={{
                                color: classColors[filter.class]
                            }}
                            value={filter.class}
                            onChange={e =>
                                this.changeFilter("class", e.target.value)
                            }
                            inputProps={{
                                name: "class",
                                id: "class"
                            }}
                            className="characterLadderFiltersSelect"
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            {classOptions.map(characterClass => (
                                <MenuItem
                                    key={characterClass.id}
                                    value={characterClass.id}
                                    style={{
                                        color: classColors[characterClass.id]
                                    }}
                                >
                                    {characterClass.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className="characterLadderFiltersFormControl">
                        <InputLabel htmlFor="class">Spec</InputLabel>
                        <Select
                            style={{
                                color: classColors[filter.class]
                            }}
                            value={filter.spec}
                            onChange={e =>
                                this.changeFilter("spec", e.target.value)
                            }
                            inputProps={{
                                name: "spec",
                                id: "spec"
                            }}
                            className="characterLadderFiltersSelect"
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            {specOptions.map(specOption => (
                                <MenuItem
                                    style={{
                                        color: classColors[filter.class]
                                    }}
                                    key={specOption.id}
                                    value={specOption.id}
                                >
                                    {specOption.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="overflowScroll">
                    <Table>
                        <TableHead className="tableHead">
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>
                                    <span className="textCapitalize">
                                        {type}
                                    </span>
                                </TableCell>

                                <TableCell>ILVL</TableCell>

                                <TableCell>Date</TableCell>
                                <TableCell>Logs</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data &&
                                data
                                    .slice(
                                        pagination.currentPage *
                                            pagination.rowsPerPage,
                                        (pagination.currentPage + 1) *
                                            pagination.rowsPerPage
                                    )
                                    .map((char, index) => {
                                        const date = new Date(char.date * 1000);
                                        return (
                                            <TableRow key={index}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    <Typography color="inherit">
                                                        <span className="textBold">
                                                            {index +
                                                                1 +
                                                                pagination.currentPage *
                                                                    pagination.rowsPerPage}
                                                            .{" "}
                                                        </span>
                                                        <Tooltip
                                                            title={
                                                                char.spec.label
                                                            }
                                                        >
                                                            <Avatar
                                                                component="span"
                                                                src={getSpecImg(
                                                                    char.spec
                                                                        .image
                                                                )}
                                                                className="classSpecAvatar"
                                                            />
                                                        </Tooltip>

                                                        <span
                                                            style={{
                                                                color:
                                                                    classColors[
                                                                        specToClass[
                                                                            char
                                                                                .spec
                                                                                .id
                                                                        ]
                                                                    ]
                                                            }}
                                                        >
                                                            <RouterLink
                                                                to={`/player/${
                                                                    char.name
                                                                }?realm=${
                                                                    char.realm
                                                                }`}
                                                            >
                                                                <Link
                                                                    component="span"
                                                                    color="inherit"
                                                                >
                                                                    {char.name}
                                                                </Link>
                                                            </RouterLink>
                                                        </span>
                                                    </Typography>
                                                </TableCell>

                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    className="textBold"
                                                >
                                                    {new Intl.NumberFormat().format(
                                                        char[type]
                                                    )}
                                                </TableCell>

                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {char.ilvl}
                                                </TableCell>

                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    <DateTooltip date={date}>
                                                        <span>
                                                            {date.toLocaleDateString()}
                                                        </span>
                                                    </DateTooltip>
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    <LogLink
                                                        logId={char.logId}
                                                        realm={char.realm}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                        </TableBody>
                    </Table>
                </div>
                {data && (
                    <TablePagination
                        rowsPerPageOptions={[]}
                        component="div"
                        count={data.length}
                        rowsPerPage={pagination.rowsPerPage}
                        page={pagination.currentPage}
                        backIconButtonProps={{
                            "aria-label": "Previous Page"
                        }}
                        nextIconButtonProps={{
                            "aria-label": "Next Page"
                        }}
                        onChangePage={this.changePage}
                    />
                )}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        filter: state.charLadderFilter
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ charLadderFilterSet }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTheme()(CharacterLadder));
