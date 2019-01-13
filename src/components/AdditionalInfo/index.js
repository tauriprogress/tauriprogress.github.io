import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Tooltip from "@material-ui/core/Tooltip";

import Info from "@material-ui/icons/Info";
import Refresh from "@material-ui/icons/Refresh";

import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import { lastUpdatedFetch } from "../../redux/actions";
import { updateDbFetch } from "../../redux/actions";

import { whenWas } from "./helpers";
import { Typography } from "@material-ui/core";

import valuesCorrectSince from "../../constants/valuesCorrectSince";

class AdditionalInfo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            issuesOpen: false
        };

        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.toggleIssues = this.toggleIssues.bind(this);
    }

    componentDidMount() {
        this.props.lastUpdatedFetch();
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
                        {loading && <Loading />}
                        {!loading && error && <ErrorMessage message={error} />}
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
                                        onClick={this.props.updateDbFetch}
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
                                <Typography>
                                    Healing absorb data and DPS of Durumu is
                                    only collected since{" "}
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
                            You can give suggestions or report bugs on the{" "}
                            <span className="textBold">
                                <a
                                    href="https://community.tauriwow.com/index.php?/topic/2076/"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    forums
                                </a>
                            </span>{" "}
                            or{" "}
                            <Tooltip title={"Just click new issue"}>
                                <span className="textBold">
                                    <a
                                        href="https://github.com/tauriprogress/tauriprogress.github.io/issues"
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        github
                                    </a>
                                </span>
                            </Tooltip>
                            .
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
