import React from "react";

import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";

import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Card from "@mui/material/Card";

import { Log } from "./index";
import { useHistory, useRouteMatch } from "react-router-dom";

import { styled } from "@mui/material";

const CustomModal = styled(Modal)(({ theme }) => ({
    display: "flex",
}));

const CustomCard = styled(Card)(({ theme }) => ({
    flex: 1,
    margin: theme.spacing(4),
    padding: `${theme.spacing(1)} 0`,
    position: "relative",
    [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
        margin: 0,
    },
    backgroundColor: theme.palette.background.default,
}));

const IconContainer = styled(Fab)(({ theme }) => ({
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(4),
    zIndex: 10,
}));

const LogContainer = styled("div")(({ theme }) => ({
    overflowY: "scroll",
    height: "100%",
}));

function Component() {
    const match = useRouteMatch();
    const history = useHistory();

    function close(e) {
        e.stopPropagation();
        history.goBack();
    }

    return (
        <CustomModal open={true} onClose={close} BackdropComponent={Backdrop}>
            <CustomCard>
                <IconContainer color={"secondary"} onClick={close}>
                    <CloseIcon />
                </IconContainer>
                <LogContainer>
                    <Log match={match} />
                </LogContainer>
            </CustomCard>
        </CustomModal>
    );
}

export const LogModal = Component;
