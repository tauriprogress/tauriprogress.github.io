import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import Info from "@material-ui/icons/Info";
import Refresh from "@material-ui/icons/Refresh";

import {
    additionalInfoSetError,
    additionalInfoSetLoading,
    additionalInfoFill
} from "../../redux/actions";

import { whenWas } from "./helpers";
import { Typography } from "@material-ui/core";

import { serverUrl } from "../../constants/urls";

class AdditionalInfo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            issuesOpen: false
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.updateDatabase = this.updateDatabase.bind(this);
        this.toggleIssues = this.toggleIssues.bind(this);
    }

    componentDidMount() {
        this.props.additionalInfoSetLoading(true);
        fetch(`${serverUrl}/lastupdated`)
            .then(res => res.json())
            .then(res => {
                if (!res.success) {
                    throw new Error(res.errorstring);
                } else {
                    this.props.additionalInfoFill(res.response);
                }
            })
            .catch(err => this.props.additionalInfoSetError(err.message));
    }

    toggleDrawer(value) {
        this.setState({ ...this.state, drawerOpen: value });
    }

    toggleIssues() {
        this.setState({ ...this.state, issuesOpen: !this.state.issuesOpen });
    }

    updateDatabase() {
        this.props.additionalInfoSetLoading(true);
        fetch(`${serverUrl}/update`)
            .then(res => res.json())
            .then(res => {
                if (!res.success) {
                    throw new Error(res.errorstring);
                } else {
                    this.props.additionalInfoFill(res.response);
                }
            })
            .catch(err => this.props.additionalInfoSetError(err.message));
    }

    render() {
        const { lastUpdated, loading, error } = this.props.additionalInfo;

        return (
            <div className="additionalInfo">
                <Fab
                    color="primary"
                    size="small"
                    onClick={() => this.toggleDrawer(true)}
                >
                    <Info fontSize="large" />
                </Fab>
                <Drawer
                    open={this.state.drawerOpen}
                    onClose={() => this.toggleDrawer(false)}
                    anchor="right"
                >
                    <div className="additionalInfoContent">
                        {loading && (
                            <div className="additionalInfoLoaderContainer">
                                <CircularProgress
                                    className="additionalInfoLoader"
                                    color="secondary"
                                />
                            </div>
                        )}
                        {!loading && error && (
                            <Typography>
                                <span className="red">{error}</span>
                            </Typography>
                        )}
                        {!loading && !error && lastUpdated && (
                            <div className="additionalInfoUpdate">
                                <Typography>
                                    Last updated:{" "}
                                    <span className="textBold">
                                        {whenWas(lastUpdated)}
                                    </span>{" "}
                                    Hours ago.
                                </Typography>
                                <Typography className="additionalInfoUpdateRefresh">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={this.updateDatabase}
                                    >
                                        <Refresh />
                                    </Fab>
                                </Typography>
                            </div>
                        )}
                        <Divider />

                        <div className="additionalInfoIssues">
                            <Typography
                                variant="button"
                                onClick={this.toggleIssues}
                                className="additionalInfoIssuesButton"
                            >
                                Known issues{" "}
                                {this.state.issuesOpen ? (
                                    <ExpandLess />
                                ) : (
                                    <ExpandMore />
                                )}
                            </Typography>
                            <Collapse
                                in={this.state.issuesOpen}
                                timeout="auto"
                                unmountOnExit
                            >
                                <Typography variant="subtitle2">
                                    Durumu:
                                </Typography>
                                <Typography>
                                    DPS of Durumu is incorrect.
                                </Typography>
                                <Typography variant="subtitle2">
                                    Resto druid:
                                </Typography>
                                <Typography>
                                    Healing data is inaccurate on some bosses.
                                </Typography>
                                <Typography variant="subtitle2">
                                    Absorb:
                                </Typography>
                                <Typography>
                                    In a lot of cases absorb data is inaccurate,
                                    eg: warlock, priest.
                                </Typography>
                                <Typography variant="caption">
                                    Unfortunatelly I can't fix these issues,
                                    since the data that I'm getting from tauri
                                    is already broken.
                                </Typography>
                            </Collapse>
                        </div>
                        <Divider />

                        <Typography>
                            Data is collected since 2018 nov. 8.
                        </Typography>
                        <Divider />

                        <Typography>
                            Fanmade website to track progression on tauri.{" "}
                            <span className="textBold">
                                <a
                                    href="https://github.com/tauriprogress/tauriprogress.github.io"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Github
                                </a>
                            </span>
                        </Typography>
                    </div>
                </Drawer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        additionalInfo: state.additionalInfo
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            additionalInfoSetError,
            additionalInfoSetLoading,
            additionalInfoFill
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdditionalInfo);
