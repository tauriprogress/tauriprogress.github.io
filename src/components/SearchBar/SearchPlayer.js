import React from "react";

import { withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import realms from "../../constants/realms";

class SearchPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: "",
            realm: realms[Object.keys(realms)[0]]
        };
        this.handleChange = this.changePlayerName.bind(this);
        this.changeRealm = this.changeRealm.bind(this);
        this.submit = this.submit.bind(this);
    }

    changePlayerName(player) {
        this.setState({ ...this.state, player: player });
    }

    changeRealm(realm) {
        this.setState({ ...this.state, realm: realm });
    }

    submit() {
        if (this.state.player)
            this.props.history.push(
                `/player/${this.state.player}?realm=${this.state.realm}`
            );
    }

    render() {
        let realmNames = [];
        for (let realmKey in realms) {
            realmNames.push(realms[realmKey]);
        }
        return (
            <div className="searchBarPlayer">
                <FormControl className="searchBarPlayerFormControl">
                    <TextField
                        id="name"
                        label="Search player"
                        value={this.state.player}
                        onChange={e => this.changePlayerName(e.target.value)}
                        margin="normal"
                    />
                </FormControl>
                <FormControl className="searchBarPlayerFormControl">
                    <InputLabel htmlFor="realm">Realm</InputLabel>
                    <Select
                        value={this.state.realm}
                        onChange={e => this.changeRealm(e.target.value)}
                        inputProps={{
                            name: "realm",
                            id: "realm"
                        }}
                        className="searchBarPlayerSelectRealm"
                    >
                        {realmNames.map(realmName => (
                            <MenuItem key={realmName} value={realmName}>
                                {realmName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    className="searchBarPlayerSubmit"
                    onClick={this.submit}
                >
                    go
                </Button>
            </div>
        );
    }
}

export default withRouter(SearchPlayer);
