import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { emphasize } from "@material-ui/core/styles/colorManipulator";

import Select from "react-select";
import Button from "@material-ui/core/Button";

import { guildsFetch } from "../../redux/actions";

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250
    },
    input: {
        display: "flex",
        padding: 0
    },
    valueContainer: {
        display: "flex",
        flexWrap: "wrap",
        flex: 1,
        alignItems: "center",
        overflow: "hidden"
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === "light"
                ? theme.palette.grey[300]
                : theme.palette.grey[700],
            0.08
        )
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    singleValue: {
        fontSize: 16
    },
    placeholder: {
        position: "absolute",
        left: 2,
        fontSize: 16
    },
    paper: {
        position: "absolute",
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0
    },
    divider: {
        height: theme.spacing.unit * 2
    }
});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps
                }
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}
function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}
function SingleValue(props) {
    return (
        <Typography
            className={props.selectProps.classes.singleValue}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}
function ValueContainer(props) {
    return (
        <div className={props.selectProps.classes.valueContainer}>
            {props.children}
        </div>
    );
}

function Menu(props) {
    return (
        <Paper
            square
            className={props.selectProps.classes.paper}
            {...props.innerProps}
        >
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer
};

function SearchGuild({ closeDrawer, classes, theme, history }) {
    const guilds = useSelector(state => {
        if (!state.guilds.data) {
            return [];
        }

        return state.guilds.data.map(guild => ({
            label: guild.guildName,
            value: {
                guildName: guild.guildName,
                realm: guild.realm
            }
        }));
    });

    const selectStyles = {
        input: base => ({
            ...base,
            color: theme.palette.text.primary,
            "& input": {
                font: "inherit"
            }
        })
    };

    const [guild, setGuild] = useState("");

    const dispatch = useDispatch();

    function submit() {
        if (guild) {
            history.push(
                `/guild/${guild.value.guildName}?realm=${guild.value.realm}`
            );
            closeDrawer();
        }
    }

    useEffect(() => {
        dispatch(guildsFetch());
    }, []);

    return (
        <div className="searchBarGuild">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    submit();
                }}
            >
                <Select
                    options={guilds}
                    value={guild}
                    onChange={setGuild}
                    className="searchBarGuildSelect"
                    classes={classes}
                    styles={selectStyles}
                    components={components}
                    isDisabled={!guilds.length}
                    placeholder="Search guild"
                    isClearable
                />
                <Button
                    variant="contained"
                    color="primary"
                    className="searchBarGuildSubmit"
                    onClick={submit}
                >
                    Search guild
                </Button>
            </form>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(withRouter(SearchGuild));
