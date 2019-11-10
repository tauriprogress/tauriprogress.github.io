import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Drawer from "@material-ui/core/Drawer";

import SearchGuild from "./SearchGuild";
import SearchPlayer from "./SearchPlayer";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import { navToggle } from "../../redux/actions";

class SearchBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer(value) {
        if (value === false) {
            this.props.navToggle(false);
        }
        this.setState({ ...this.state, drawerOpen: value });
    }

    render() {
        const { loading, error } = this.props;
        return (
            <React.Fragment>
                <span
                    className="navOption"
                    id="navSearch"
                    onClick={() => this.toggleDrawer(true)}
                >
                    Search
                </span>
                <Drawer
                    open={this.state.drawerOpen}
                    onClose={() => this.toggleDrawer(false)}
                    anchor="left"
                    className="searchBar"
                >
                    {loading && <Loading />}
                    {error && <ErrorMessage message={error} />}
                    <React.Fragment>
                        <SearchGuild
                            closeDrawer={() => this.toggleDrawer(false)}
                        />
                        <SearchPlayer
                            closeDrawer={() => this.toggleDrawer(false)}
                        />
                    </React.Fragment>
                </Drawer>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.guilds.loading,
        error: state.guilds.error
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ navToggle }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar);
