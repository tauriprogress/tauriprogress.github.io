import React from "react";

import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import Select from "react-select";
import Button from "@material-ui/core/Button";

class SearchGuild extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(value) {
        this.setState({ ...this.state, value: value });
    }

    submit() {
        if (this.state.value)
            this.props.history.push(
                `/guild/${this.state.value.value.guildName}?realm=${
                    this.state.value.value.realm
                }`
            );
    }

    render() {
        const { guilds } = this.props;
        return (
            <div className="searchBarGuild">
                <Select
                    options={guilds}
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder="Search guild"
                    className="searchBarGuildSelect"
                    isClearable
                />
                <Button
                    variant="contained"
                    color="primary"
                    className="searchBarGuildSubmit"
                    onClick={this.submit}
                >
                    go
                </Button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        guilds: state.guilds.data.map(guild => ({
            label: guild.guildName,
            value: {
                guildName: guild.guildName,
                realm: guild.realm
            }
        }))
    };
}

export default withRouter(connect(mapStateToProps)(SearchGuild));
