import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React from "react";

import InfoIcon from "../InfoIcon";

import { styled } from "@mui/material";

const TitleContainer = styled(MuiDialogTitle)(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}));
const Question = styled(Typography)(() => ({
    marginTop: "30px",
    fontStyle: "italic",
    fontWeight: "bold",
}));

const Example = styled("span")(() => ({
    fontWeight: "bold",
}));

const CustomButton = styled("span")(() => ({
    "&:hover": {
        cursor: "pointer",
    },
}));

function DialogTitle({ children, onClose, ...other }) {
    return (
        <TitleContainer {...other}>
            {children}
            {onClose ? (
                <IconButton aria-label="close" onClick={onClose} size="large">
                    <CloseIcon />
                </IconButton>
            ) : null}
        </TitleContainer>
    );
}

function PerformanceExplanation() {
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
                <CustomButton onClick={handleClickOpen}>
                    <InfoIcon /> Score
                </CustomButton>
            </Tooltip>

            <Dialog onClose={handleClose} open={open}>
                <DialogTitle onClose={handleClose}>Score</DialogTitle>
                <DialogContent dividers>
                    <Question gutterBottom>
                        How is the score calculated?
                    </Question>
                    <Typography gutterBottom>
                        On each boss comparing the character's dps/hps to the
                        best dps/hps of the boss, adding them together, then
                        taking the average of it. This value is then used to
                        calculate the score based on an arbitrary max score of
                        6969. To derive the character's score, multiply the max
                        score with the performance.
                    </Typography>
                    <Typography gutterBottom>
                        <Example>Example:</Example> current character dps of
                        boss / best character dps of boss = relative performance
                        <br />
                        1. boss: 10 dps / 100 dps = 10%
                        <br />
                        2. boss: 160 dps / 200 dps = 80%
                        <br />
                        3. boss: 300 dps / 1000 dps = 30%
                        <br />
                        4. boss: 0 dps / 1000 dps = 0%
                        <br />
                        Overall performance: ( 10 + 80 + 30 + 0 ) / 4 = 30%
                        <br />
                        Score: 6969 * 0.3 = 2090.7 (This value is floored to
                        2090 for display)
                    </Typography>
                    <Typography gutterBottom>
                        In this example there are only 4 bosses in the instance
                        and the current character didn't kill the last one.
                    </Typography>
                    <Question gutterBottom>
                        Why not use average dps/hps?
                    </Question>
                    <Typography gutterBottom>
                        If average dps/hps would be used, then certain bosses
                        would contribute more to the overall performance of a
                        character where really high dps/hps is accessible.
                        Normalization is necessary so that the performance of
                        each boss contributes the same amount to the overall
                        performance.
                    </Typography>
                    <Typography gutterBottom>
                        <Example>Example:</Example> On Wotlk Flame Leviathan you
                        can achieve 300k+ dps, while on most other bosses it's
                        less than 10k. If average dps is used then it would be
                        enough to do really well on Flame Leviathan and the rest
                        of the bosses wouldn't matter too much.
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

export default PerformanceExplanation;
