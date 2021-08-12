import React from "react";

import { goBack } from "connected-react-router";

import Fab from "@material-ui/core/Fab";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Card from "@material-ui/core/Card";

import Log from "./index";
import { useDispatch } from "react-redux";

function styles(theme) {
    return {
        modal: {
            display: "flex"
        },
        card: {
            flex: 1,
            margin: theme.spacing(4),
            padding: `${theme.spacing(1)}px 0`,
            position: "relative",
            [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
                margin: 0
            },
            backgroundColor: theme.palette.background.default
        },
        logContainer: {
            overflowY: "scroll",
            height: "100%"
        },
        iconContainer: {
            position: "absolute",
            top: theme.spacing(2),
            right: theme.spacing(4),
            zIndex: 10
        }
    };
}

function LogModal({ match, classes }) {
    const dispatch = useDispatch();

    function close(e) {
        e.stopPropagation();
        dispatch(goBack());
    }

    return (
        <Modal
            open={true}
            onClose={close}
            className={classes.modal}
            BackdropComponent={Backdrop}
        >
            <Card className={classes.card}>
                <Fab
                    color={"secondary"}
                    onClick={close}
                    className={classes.iconContainer}
                >
                    <CloseIcon />
                </Fab>
                <div className={classes.logContainer}>
                    <Log match={match} />
                </div>
            </Card>
        </Modal>
    );
}

export default withStyles(styles)(LogModal);
