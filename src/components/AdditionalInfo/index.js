//import { valuesCorrectSince } from "tauriprogress-constants";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Info from "@material-ui/icons/Info";

import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import { lastUpdatedFetch } from "../../redux/actions";

import { convertMinutes } from "../../helpers";
import { Typography } from "@material-ui/core";

function AdditionalInfo() {
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
        <div className="additionalInfo">
            <Fab
                color="primary"
                size="small"
                onClick={() => setOpen(isOpen ? false : true)}
            >
                <Info fontSize="large" />
            </Fab>
            <Drawer open={isOpen} onClose={() => setOpen(false)} anchor="right">
                <div className="additionalInfoContent">
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
                            {new Date(1541640000000).toLocaleDateString()}
                        </span>{" "}
                        and only of heroic encounters.
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

export default AdditionalInfo;
