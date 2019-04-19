import { realms } from "tauriprogress-constants";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import { playerFetch } from "../../redux/actions";

let realmNames = [];
for (let realmKey in realms) {
    realmNames.push(realms[realmKey]);
}

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
        if (this.state.player) {
            this.props.history.push(
                `/player/${this.state.player}?realm=${this.state.realm}`
            );
            this.props.closeDrawer();
            this.props.playerFetch({
                playerName: this.state.player,
                realm: this.state.realm
            });
        }
    }

    render() {
        return (
            <div className="searchBarPlayer">
                <FormControl className="searchBarPlayerFormControl">
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            this.submit();
                        }}
                    >
                        <TextField
                            id="name"
                            label="Search player"
                            value={this.state.player}
                            onChange={e =>
                                this.changePlayerName(e.target.value)
                            }
                            margin="normal"
                            className="searchBarPlayerName"
                        />
                    </form>
                </FormControl>
                <br />
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
                    search player
                </Button>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ playerFetch }, dispatch);
}

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(SearchPlayer)
);
