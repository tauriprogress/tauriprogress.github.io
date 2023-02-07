import React from "react";

import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import withStyles from "@mui/styles/withStyles";

import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Card from "@mui/material/Card";

import Log from "./index";
import { useHistory } from "react-router-dom";

function styles(theme) {
    return {
        modal: {
            display: "flex",
        },
        card: {
            flex: 1,
            margin: theme.spacing(4),
            padding: `${theme.spacing(1)} 0`,
            position: "relative",
            [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
                margin: 0,
            },
            backgroundColor: theme.palette.background.default,
        },
        logContainer: {
            overflowY: "scroll",
            height: "100%",
        },
        iconContainer: {
            position: "absolute",
            top: theme.spacing(2),
            right: theme.spacing(4),
            zIndex: 10,
        },
    };
}

function LogModal({ match, classes }) {
    const history = useHistory();

    function close(e) {
        e.stopPropagation();
        history.goBack();
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
