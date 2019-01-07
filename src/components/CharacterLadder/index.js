import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import specs from "../../constants/specs";
import specToClass from "../../constants/specToClass";
import characterClassColors from "../../constants/characterClassColors";
import characterClasses from "../../constants/characterClasses";

import {
    charLadderFilterSet,
    charLadderFilterReset
} from "../../redux/actions";

import { getSpecImg } from "../DisplayRaid/helpers";
import { applyFilter } from "./helpers";

class CharacterLadder extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                rowsPerPage: 50,
                currentPage: 0
            },
            filterOpen: false
        };
        this.changePage = this.changePage.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
    }

    componentWillUnmount() {
        this.props.charLadderFilterReset();
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

    toggleFilter() {
        this.setState({ ...this.state, filterOpen: !this.state.filterOpen });
    }

    render() {
        const { type, filter } = this.props;
        let data = applyFilter(filter, this.props.data);
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

        return (
            <div className="overflowScroll">
                <div className="characterLadderFilters">
                    <Button onClick={this.toggleFilter}>
                        Filters{" "}
                        {this.state.filterOpen ? (
                            <ExpandLess />
                        ) : (
                            <ExpandMore />
                        )}
                    </Button>
                    <Collapse
                        in={this.state.filterOpen}
                        timeout="auto"
                        unmountOnExit
                        className="characterLadderFiltersContainer"
                    >
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
                        <br />

                        <FormControl className="characterLadderFiltersFormControl">
                            <InputLabel htmlFor="class">Class</InputLabel>
                            <Select
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
                                    >
                                        {characterClass.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className="characterLadderFiltersFormControl">
                            <InputLabel htmlFor="class">Spec</InputLabel>
                            <Select
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
                                        key={specOption.id}
                                        value={specOption.id}
                                    >
                                        {specOption.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Collapse>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>

                            <TableCell>Name</TableCell>
                            <TableCell>
                                <span className="textCapitalize">{type}</span>
                            </TableCell>

                            <TableCell>ILVL</TableCell>

                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(
                                pagination.currentPage * pagination.rowsPerPage,
                                (pagination.currentPage + 1) *
                                    pagination.rowsPerPage
                            )
                            .map((char, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {index +
                                            1 +
                                            pagination.currentPage *
                                                pagination.rowsPerPage}
                                    </TableCell>

                                    <TableCell component="th" scope="row">
                                        <Tooltip title={char.spec.label}>
                                            <Avatar
                                                component="span"
                                                src={getSpecImg(
                                                    char.spec.image
                                                )}
                                                className="classSpecAvatar"
                                            />
                                        </Tooltip>

                                        <span
                                            style={{
                                                color:
                                                    characterClassColors[
                                                        specToClass[
                                                            char.spec.id
                                                        ]
                                                    ]
                                            }}
                                        >
                                            <Link
                                                to={`/player/${
                                                    char.name
                                                }?realm=${char.realm}`}
                                            >
                                                {char.name}
                                            </Link>
                                        </span>
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

                                    <TableCell component="th" scope="row">
                                        {char.ilvl}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {new Date(
                                            char.date * 1000
                                        ).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
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
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        filter: state.charLadderFilter
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { charLadderFilterSet, charLadderFilterReset },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CharacterLadder);
