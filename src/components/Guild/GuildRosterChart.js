import React from "react";
import { useSelector } from "react-redux";

import withTheme from "@mui/styles/withTheme";

import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import Avatar from "../Avatar";

import { getClassImg } from "../../helpers";

import { environmentCharacterClassNamesSelector } from "../../redux/selectors";
import { styled } from "@mui/system";

const Container = styled(Grid)(({ theme }) => ({
    margin: `0 ${theme.spacing(1)}`,
    display: "flex",
    width: "100px",
    height: "100%",
}));

const Row = styled(Grid)(({ theme }) => ({
    height: "30px",
    margin: `${theme.spacing(0.5)} 0`,
}));

const ClassImgContainer = styled(Grid)(({ theme }) => ({
    paddingLeft: theme.spacing(0.5),
    display: "flex",
    alignItems: "center",
}));

const ClassBarContainer = styled(Grid)({
    flex: 1,
});

const ClassBar = styled("div")(({ theme }) => ({
    marginLeft: "auto",
    height: "100%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    borderRadius: "3px 0 0 3px",
    "& > p": {
        position: "absolute",
        top: "50%",
        right: 0,
        transform: "translate(0, -50%)",
        marginLeft: "auto",
        marginRight: theme.spacing(1),
        fontWeight: "bold",
        color: theme.palette.primary.contrastText,
        textShadow: "0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000",
        zIndex: 2,
    },
    "&:before": {
        position: "absolute",
        top: "0",
        left: "0",
        display: "block",
        height: "100%",
        width: "100%",
        content: "''",
        background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(100, 100, 100, 0.2) 100%)",
    },
}));

function GuildRosterChart({ theme, totalChars, classInfo, maxClassCount }) {
    const characterClassNames = useSelector(
        environmentCharacterClassNamesSelector
    );
    return (
        <Container
            container
            wrap="nowrap"
            justifyContent="center"
            direction="column"
        >
            {classInfo.map((charClass) => (
                <Row key={charClass.classId} container wrap="nowrap">
                    <ClassBarContainer item>
                        <Tooltip
                            placement={"left"}
                            title={
                                <span>{`${charClass.count} ${
                                    characterClassNames[charClass.classId]
                                }`}</span>
                            }
                        >
                            <ClassBar
                                style={{
                                    width: `${
                                        (charClass.count / maxClassCount) * 100
                                    }%`,
                                    backgroundColor:
                                        theme.palette.classColors[
                                            charClass.classId
                                        ].background,
                                }}
                            >
                                <Typography>
                                    {Math.floor(
                                        (charClass.count / totalChars) * 100
                                    )}
                                    %
                                </Typography>
                            </ClassBar>
                        </Tooltip>
                    </ClassBarContainer>
                    <ClassImgContainer justifyContent="center" item>
                        <Avatar
                            src={getClassImg(charClass.classId)}
                            title={characterClassNames[charClass.classId] || ""}
                        />
                    </ClassImgContainer>
                </Row>
            ))}
        </Container>
    );
}

export default withTheme(GuildRosterChart);
