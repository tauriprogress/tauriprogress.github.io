import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Drawer from "@material-ui/core/Drawer";

import SearchGuild from "./SearchGuild";
import SearchPlayer from "./SearchPlayer";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import { guildsFetch } from "../../redux/actions";

class SearchBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    componentDidMount() {
        this.props.guildsFetch();
    }

    toggleDrawer(value) {
        this.setState({ ...this.state, drawerOpen: value });
    }

    render() {
        const { loading, error, data } = this.props;
        return (
            <React.Fragment>
                <span
                    className="navOption"
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
                    {!loading && !error && data && (
                        <React.Fragment>
                            <SearchGuild
                                closeDrawer={() => this.toggleDrawer(false)}
                            />
                            <SearchPlayer
                                closeDrawer={() => this.toggleDrawer(false)}
                            />
                        </React.Fragment>
                    )}
                </Drawer>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.guilds.loading,
        error: state.guilds.error,
        data: state.guilds.data ? true : false
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ guildsFetch }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar);
