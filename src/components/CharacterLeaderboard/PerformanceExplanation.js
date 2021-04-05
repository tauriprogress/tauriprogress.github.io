import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import InfoIcon from "../InfoIcon";

function styles(theme) {
    return {
        titleContainer: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        },
        button: {
            "&:hover": {
                cursor: "pointer"
            }
        },
        question: {
            marginTop: "30px",
            fontStyle: "italic",
            fontWeight: "bold"
        },
        example: {
            fontWeight: "bold"
        }
    };
}

function DialogTitle({ children, classes, onClose, ...other }) {
    return (
        <MuiDialogTitle
            disableTypography
            className={classes.titleContainer}
            {...other}
        >
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
}

function PerformanceExplanation({ classes }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title={"Click for details"}>
                <span onClick={handleClickOpen} className={classes.button}>
                    Performance <InfoIcon />
                </span>
            </Tooltip>

            <Dialog onClose={handleClose} open={open}>
                <DialogTitle onClose={handleClose} classes={classes}>
                    Performance
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom className={classes.question}>
                        What is performance based on?
                    </Typography>
                    <Typography gutterBottom>
                        Character performance calculation is made in 2 stages.
                    </Typography>
                    <Typography gutterBottom>
                        First stage: on each boss comparing the character's
                        dps/hps to the best dps/hps of the boss, adding them
                        together, then taking the average of it.
                    </Typography>
                    <Typography gutterBottom>
                        Second stage: Getting the best character overall
                        performance and comparing it to every other character
                        overall performance.
                    </Typography>
                    <Typography gutterBottom>
                        <span className={classes.example}>
                            First stage Example:
                        </span>{" "}
                        current character dps of boss / best character dps of
                        boss = relative performance
                        <br />
                        1. boss: 10 dps / 100 dps = 10% performance
                        <br />
                        2. boss: 160 dps / 200 dps = 80% performance
                        <br />
                        3. boss: 300 dps / 1000 dps = 30% performance
                        <br />
                        4. boss: 0 dps / 1000 dps = 0% performance
                        <br />
                        Overall performance: ( 10 + 80 + 30 + 0 ) / 4 = 30%
                        performance
                    </Typography>
                    <Typography gutterBottom>
                        <span className={classes.example}>
                            Second Stage Example:
                        </span>{" "}
                        Extending on the first example, let's say the best
                        character did 87%, and the current character did 30%.
                        <br />
                        The current becomes 30/87 = 34,5% performance, <br />{" "}
                        the best character becomes 87/87 = 100% performance.
                    </Typography>
                    <Typography gutterBottom>
                        In this example there are only 4 bosses in the instance
                        and the current character didn't kill the last one.
                    </Typography>
                    <Typography gutterBottom className={classes.question}>
                        Why not use average dps/hps?
                    </Typography>
                    <Typography gutterBottom>
                        If average dps/hps would be used, then certain bosses
                        would contribute more to the overall performance of a
                        character where really high dps/hps is accessible.
                        Normalization is necessary so that the performance of
                        each boss contributes the same amount to the overall
                        performance.
                    </Typography>
                    <Typography gutterBottom>
                        <span className={classes.example}>Example:</span> On
                        Wotlk Flame Leviathan you can achieve 300k+ dps, while
                        on most other bosses it's less than 10k. If average dps
                        is used then it would be enough to do really well on
                        Flame Leviathan and the rest of the bosses wouldn't
                        matter too much.
                    </Typography>
                    <Typography gutterBottom>
                        This problem exists in other instances as well, but to a
                        lesser degree.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default withStyles(styles)(PerformanceExplanation);
