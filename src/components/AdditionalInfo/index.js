import { valuesCorrectSince } from "tauriprogress-constants";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Collapse from "@material-ui/core/Collapse";
import Tooltip from "@material-ui/core/Tooltip";

import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Info from "@material-ui/icons/Info";
import Refresh from "@material-ui/icons/Refresh";

import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import { lastUpdatedFetch, updateDbFetch } from "../../redux/actions";

import { convertMinutes } from "../../helpers";
import { Typography } from "@material-ui/core";

class AdditionalInfo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            issuesOpen: false
        };

        this.open = this.open.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.toggleIssues = this.toggleIssues.bind(this);
    }

    open() {
        this.props.lastUpdatedFetch();
        this.toggleDrawer(true);
    }

    toggleDrawer(value) {
        this.setState({ ...this.state, drawerOpen: value });
    }

    toggleIssues() {
        this.setState({ ...this.state, issuesOpen: !this.state.issuesOpen });
    }

    render() {
        const { lastUpdated, loading, error } = this.props.additionalInfo;

        return (
            <div className="additionalInfo">
                <Fab color="primary" size="small" onClick={this.open}>
                    <Info fontSize="large" />
                </Fab>
                <Drawer
                    open={this.state.drawerOpen}
                    onClose={() => this.toggleDrawer(false)}
                    anchor="right"
                >
                    <div className="additionalInfoContent">
                        {loading && <Loading />}
                        {!loading && error && <ErrorMessage message={error} />}
                        {!loading && (
                            <div className="additionalInfoUpdate">
                                {lastUpdated && (
                                    <Typography>
                                        Last updated:{" "}
                                        <span className="textBold">
                                            {convertMinutes(lastUpdated)}
                                        </span>{" "}
                                        ago.
                                    </Typography>
                                )}

                                <Typography className="additionalInfoUpdateRefresh">
                                    <Tooltip title="Update database">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={this.props.updateDbFetch}
                                        >
                                            <Refresh />
                                        </Fab>
                                    </Tooltip>
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
                                <Link color="inherit" component="span">
                                    Known issues{" "}
                                    {this.state.issuesOpen ? (
                                        <ExpandLess />
                                    ) : (
                                        <ExpandMore />
                                    )}
                                </Link>
                            </Typography>
                            <Collapse
                                in={this.state.issuesOpen}
                                timeout="auto"
                                unmountOnExit
                            >
                                <Typography>
                                    DPS of Durumu is only collected since{" "}
                                    <span className="textBold">
                                        {new Date(
                                            valuesCorrectSince * 1000
                                        ).toLocaleDateString()}{" "}
                                    </span>
                                    due to a bug.
                                    <br /> Healing and absorb in some cases may
                                    be incorrect before{" "}
                                    <span className="textBold">
                                        {new Date(
                                            valuesCorrectSince * 1000
                                        ).toLocaleDateString()}{" "}
                                    </span>
                                    due to a bug.
                                </Typography>
                            </Collapse>
                        </div>
                        <Divider />

                        <Typography>
                            <Link
                                color="inherit"
                                component="span"
                                className="textBold"
                            >
                                <a
                                    href="https://tauriwow.com/"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    Tauri WoW
                                </a>
                            </Link>

                            <br />

                            <span className="textBold">
                                <Link
                                    color="inherit"
                                    component="span"
                                    className="textBold"
                                >
                                    <a
                                        href="https://community.tauriwow.com/index.php?/topic/2076/"
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        Forums
                                    </a>
                                </Link>
                            </span>
                            <br />
                            <span className="textBold">
                                <Link
                                    color="inherit"
                                    component="span"
                                    className="textBold"
                                >
                                    <a
                                        href="https://github.com/tauriprogress"
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        Github
                                    </a>
                                </Link>
                            </span>
                        </Typography>
                        <Divider />

                        <Typography>
                            Data is collected since{" "}
                            <span className="textBold">
                                {new Date(1541640000000).toLocaleDateString()}.
                            </span>
                        </Typography>
                        <Divider />

                        <Typography>
                            Fanmade website to track progression on tauri.
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
            lastUpdatedFetch,
            updateDbFetch
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdditionalInfo);
