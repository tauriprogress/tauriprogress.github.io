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

    const { lastUpdated, isUpdating, loading, error } = useSelector(
        state => state.additionalInfo
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
                    <div className="additionalInfoUpdate">
                        <Typography>
                            Last updated:{" "}
                            <span className="textBold">
                                {convertMinutes(lastUpdated || 0)}
                            </span>{" "}
                            ago.
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

                    <span className="textBold">
                        <Link
                            color="inherit"
                            href="https://community.tauriwow.com/index.php?/topic/2076/"
                            target="_blank"
                            rel="noreferrer noopener"
                            className={classes.link}
                        >
                            Forums
                        </Link>
                    </span>
                    <br />
                    <span className="textBold">
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
                <Typography>
                    Data is collected since{" "}
                    <DisplayDate date={new Date(1541640000000)} /> and only of
                    heroic encounters.
                </Typography>

                <Divider />
                <Typography>
                    Dps of arms warriors between{" "}
                    <DisplayDate date={new Date(1565187719000)} /> and{" "}
                    <DisplayDate date={new Date(1573639200000)} /> have been set
                    to 0 because of a{" "}
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

                <Typography>
                    Fanmade website to track progression on tauri.
                </Typography>
            </Drawer>
        </React.Fragment>
    );
}

export default withStyles(styles)(AdditionalInfo);
