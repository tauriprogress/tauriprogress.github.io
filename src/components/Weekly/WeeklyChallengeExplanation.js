import Typography from "@mui/material/Typography";
import React from "react";

import { Container, styled } from "@mui/material";

const HightLight = styled(Typography)(() => ({
    marginTop: "30px",
    fontWeight: "bold",
    fontSize: `${18 / 16}rem`,
}));

const BoldText = styled(Typography)(() => ({
    marginTop: "30px",
    fontWeight: "bold",
}));

const CustomContainer = styled(Container)(() => ({
    marginTop: "60px",
    maxWidth: "70ch !important",
    minWidth: "40ch",
}));

function WeeklyChallengeExplanation({ challengeName }) {
    return (
        <CustomContainer>
            <HightLight>
                Weekly challenge: compete every week in two types of challenges
            </HightLight>
            <BoldText>
                Raid Boss: Compete on a randomly selected raid boss.
            </BoldText>
            <Typography>
                As a player, achieve the highest DPS / HPS and compare your
                performance to others overall or to a given spec. As a team, aim
                to slay the boss the quickest way possible.
            </Typography>
            <Typography>This weeks challenge: {challengeName}</Typography>

            <BoldText>Raid Clear: Have the quickest raid clear.</BoldText>
            <Typography>
                Assemble your team and head to clear the raid as fast as
                possible. Be careful, you can only swap 2 characters in 10 man
                mode and 5 characters in 25 man mode in order for your clear to
                be considered valid.
            </Typography>
        </CustomContainer>
    );
}

export default WeeklyChallengeExplanation;
