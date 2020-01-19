import React from "react";

import Fab from "@material-ui/core/Fab";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";

import FightLog from "./";

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
            }
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

function FightLogWithModal({ classes }) {
    const history = useHistory();

    function close(e) {
        e.stopPropagation();
        history.goBack();
    }

    return (
        <Modal open={true} onClose={close} className={classes.modal}>
            <Card className={classes.card}>
                <Fab
                    color={"secondary"}
                    onClick={close}
                    className={classes.iconContainer}
                >
                    <CloseIcon />
                </Fab>
                <div className={classes.logContainer}>
                    <FightLog />
                </div>
            </Card>
        </Modal>
    );
}

export default withStyles(styles)(FightLogWithModal);
