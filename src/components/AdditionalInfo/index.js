import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Info from "@material-ui/icons/Info";

import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import DisplayDate from "../DisplayDate";

import { lastUpdatedFetch } from "../../redux/actions";

import { convertMinutes } from "../../helpers";

function styles(theme) {
    return {
        bold: {
            fontWeight: "bold",
            wordBreak: "break-all"
        },
        drawerPaper: {
            padding: theme.spacing(2),
            width: "260px"
        },
        link: {
            fontWeight: "bold"
        }
    };
}

function AdditionalInfo({ classes }) {
    const [isOpen, setOpen] = useState(false);

    const { lastUpdated, isUpdating, loading, error, realmGroup } = useSelector(
        state => ({
            ...state.additionalInfo,
            realmGroup:
                Object.keys(state.environment.realms).length > 1
                    ? "tauri"
                    : "crystalsong"
        })
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (isOpen) {
            dispatch(lastUpdatedFetch());
        }
    }, [isOpen]);

    return (
        <React.Fragment>
            <Info
                fontSize="large"
                onClick={() => setOpen(isOpen ? false : true)}
            />
            <Drawer
                open={isOpen}
                onClose={() => setOpen(false)}
                anchor="right"
                classes={{ paper: classes.drawerPaper }}
            >
                {loading && <Loading />}
                {!loading && error && <ErrorMessage message={error} />}
                {!loading && (
                    <div>
                        <Typography>
                            Last updated:{" "}
                            <span>{convertMinutes(lastUpdated || 0)}</span> ago.
                        </Typography>
                        {isUpdating && (
                            <Typography>
                                Database is currently updating.
                            </Typography>
                        )}
                    </div>
                )}

                <Divider />

                <Typography>
                    <Link
                        href="https://tauriwow.com/"
                        target="_blank"
                        color="inherit"
                        rel="noreferrer noopener"
                        className={classes.link}
                    >
                        Tauri WoW
                    </Link>

                    <br />
                    <span>
                        <Link
                            color="inherit"
                            href="https://github.com/tauriprogress"
                            target="_blank"
                            rel="noreferrer noopener"
                            className={classes.link}
                        >
                            Github
                        </Link>
                    </span>
                </Typography>

                <Divider />
                {realmGroup === "tauri" ? (
                    <React.Fragment>
                        <Typography>
                            Data is collected since{" "}
                            <DisplayDate date={new Date(1541640000000)} /> and
                            only of heroic encounters.
                        </Typography>

                        <Divider />
                        <Typography>
                            Dps of arms warriors between{" "}
                            <DisplayDate date={new Date(1565187719000)} /> and{" "}
                            <DisplayDate date={new Date(1573639200000)} /> have
                            been set to 0 because of a{" "}
                            <Link
                                color="secondary"
                                href="https://bug.tauriwow.com/index.php?do=details&task_id=18932"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.link}
                            >
                                bug fix
                            </Link>
                            .
                        </Typography>
                        <Divider />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography>
                            Role filtering and composition counting may be
                            incorrect for wotlk, it's hard to determine role
                            from spec.
                        </Typography>
                        <Divider />
                    </React.Fragment>
                )}

                <Typography>
                    Fanmade website to track progression on tauri.
                </Typography>
                <Divider />
                <Typography>
                    Consider supporting with
                    <br />
                    <span className={classes.bold}>
                        Bitcoin: <br /> 1BMRBQXuMfWixfAStiYGxmBjXgv3N9535G
                    </span>
                    <br />
                    <span className={classes.bold}>
                        Ethereum: <br />{" "}
                        0x6aad5b7641EC021918EB03b4c8bB947ea668C3dc
                    </span>
                </Typography>
            </Drawer>
        </React.Fragment>
    );
}

export default withStyles(styles)(AdditionalInfo);
