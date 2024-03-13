import React, { useEffect } from "react";
import Page from "../Page";
import { withRealmGroupName } from "../Router/withRealmGroupName";
import { Button, Card, Grid, Typography } from "@mui/material";
import { PATREON_CLIENT, getBossImg } from "../../helpers";
import { getPatreonRedirect } from "./helpers";
import {
    environmentCurrentRaidBossesSelector,
    userEntireSelector,
    voteEntireSelector,
} from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import {
    userAuthenticate,
    userLoginLogout,
    weeklyChallengeVoteFetch,
    weeklyChallengeVoteForBoss,
} from "../../redux/actions";
import styled from "@emotion/styled";
import ImageProgressBar from "../ImageProgressBar";
import ErrorMessage from "../ErrorMessage";

const patreonUrl = `https://www.patreon.com/oauth2/authorize?response_type=code&client_id=${PATREON_CLIENT}`;

const GridContainer = styled(Grid)({
    flexWrap: "wrap-reverse",
    justifyContent: "space-around",
});

const GridItem = styled(Grid)({
    padding: "20px",
    minWidth: "320px",
    maxWidth: "500px",
    flex: 1,
});

const LongButton = styled(Button)({
    width: "200px",
    marginBottom: "30px",
});

const Title = styled(Typography)({
    marginBottom: "30px",
});

const Description = styled(Typography)({
    marginBottom: "30px",
});

function WeeklyChallengeVote() {
    const { user, loading: userAuthLoading } = useSelector(userEntireSelector);
    const { votes, currentVote, error, loading } =
        useSelector(voteEntireSelector);
    const dispatch = useDispatch();

    const loggedIn = !!user;

    useEffect(() => {
        dispatch(weeklyChallengeVoteFetch());
        if (!loggedIn) {
            dispatch(userAuthenticate());
        }
    }, [dispatch]);

    return (
        <Page title={"Tauri Progress"}>
            <section>
                <GridContainer container>
                    <GridItem item>
                        <DisplayVotes
                            votes={votes}
                            loggedIn={loggedIn}
                            loading={loading}
                        />
                    </GridItem>
                    <GridItem item>
                        <Title variant="h4">Vote for the next challenge</Title>
                        <Description>
                            Log in with patreon and vote for the next weeks
                            challenge. By default each boss has a weight of 100
                            points that determine the chance of selecting it.
                            Your vote contributes 20 points which can be
                            increased to a 100 points by becoming a patreon
                            member. (If you already casted your vote without
                            membership for the week, you should vote again to
                            increase the weight.)
                        </Description>

                        {loggedIn ? (
                            <>
                                <LongButton
                                    color="secondary"
                                    variant="contained"
                                    onClick={() => dispatch(userLoginLogout())}
                                    disabled={userAuthLoading}
                                >
                                    LOG OUT
                                </LongButton>
                            </>
                        ) : (
                            <LongButton
                                color="secondary"
                                variant="contained"
                                href={`${patreonUrl}&redirect_uri=${getPatreonRedirect()}`}
                                disabled={userAuthLoading}
                            >
                                LOG IN
                            </LongButton>
                        )}
                        {currentVote && (
                            <Typography>
                                Current vote: {currentVote.bossName} +{" "}
                                {currentVote.weight} points
                            </Typography>
                        )}
                        {error && <ErrorMessage message={error} />}
                    </GridItem>
                </GridContainer>
            </section>
        </Page>
    );
}

const BossContainer = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    borderRadius: "4px",
}));

const BossGridContainer = styled(Grid)({
    display: "flex",
    flexWrap: "nowrap",
});

const VoteButton = styled(Button)((theme) => ({
    boxShadow: "none",
    borderRadius: "0px",
    height: "100%",
}));

function DisplayVotes({ loggedIn, votes, loading }) {
    const bosses = useSelector(environmentCurrentRaidBossesSelector);
    const dispatch = useDispatch();

    const totalWeight = votes.reduce((acc, curr) => {
        acc = acc + curr.weight;
        return acc;
    }, 0);

    function vote(bossName) {
        dispatch(weeklyChallengeVoteForBoss(bossName));
    }

    return bosses.map((boss) => {
        const currentBossVote = votes.find(
            (vote) => vote.name === boss.name
        ) || {
            weight: 0,
        };
        const percentage =
            loading || !votes.length ? 0 : currentBossVote.weight / totalWeight;
        return (
            <BossContainer key={boss.name}>
                <BossGridContainer container>
                    <Grid
                        item
                        style={{
                            flex: 1,
                            minWidth: 0,
                        }}
                    >
                        <ImageProgressBar
                            textLeft={boss.name}
                            textRight={`${currentBossVote.weight} (${(
                                percentage * 100
                            ).toFixed(1)} %)`}
                            image={`url("${getBossImg(boss.name, "s")}")`}
                            style={{
                                backgroundSize: "cover",
                                width: "100%",
                                animation: loading
                                    ? "2s infinite opacityLoading"
                                    : "none",
                            }}
                            progressPercentage={percentage}
                        />
                    </Grid>
                    <Grid item>
                        <VoteButton
                            color="secondary"
                            variant="contained"
                            disabled={!loggedIn || loading}
                            onClick={() => vote(boss.name)}
                        >
                            VOTE
                        </VoteButton>
                    </Grid>
                </BossGridContainer>
            </BossContainer>
        );
    });
}

export default withRealmGroupName(
    React.memo(WeeklyChallengeVote, (prevProps, nextProps) => {
        return JSON.stringify(prevProps) === JSON.stringify(nextProps);
    })
);
