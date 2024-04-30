import { Grid, Typography, styled } from "@mui/material";
import {
    characterDataSelector,
    environmentCharacterSpecsSelector,
} from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loading";
import { useLocation, useRouteMatch } from "react-router-dom";
import queryString from "query-string";
import { characterDataFetch } from "../../redux/actions";
import { getProfessionImg, talentTreeToSpec } from "../../helpers";
import { mapSpecIdToStats } from "./helpers";
import StatIcon from "./StatIcon";
import { useEffect } from "react";

const Container = styled("section")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
}));

const Icon = styled("img")(({ theme }) => ({
    display: "block",
    margin: "4px",
    borderRadius: "6px",
}));

const StatContainer = styled(Grid)(({ theme }) => ({
    display: "flex",
}));

const ProfessionContainer = styled(Grid)(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

const StatLabel = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    textTransform: "uppercase",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
}));

function CharacterStats() {
    const { loading, error, stats, specName, professions } = useSelector(
        characterDataSelector
    );
    const specs = useSelector(environmentCharacterSpecsSelector);
    const dispatch = useDispatch();

    const location = useLocation();
    const match = useRouteMatch();
    const characterName = match.params.characterName;
    const realm = queryString.parse(location.search).realm;

    function fetchCharacter() {
        dispatch(
            characterDataFetch({
                name: characterName,
                realm: realm,
            })
        );
    }
    useEffect(() => {
        dispatch(
            characterDataFetch({
                name: characterName,
                realm: realm,
            })
        );
    }, [dispatch, characterName, realm]);
    function statValue(stat) {
        let value = stats[stat.statName].toLocaleString().replace(".", " ");
        return value;
    }

    function statLabel(stat) {
        let label = stat.label;

        if (stat.percentName) {
            label += ` - ${stats[stat.percentName]}%`;
        }
        return label;
    }

    const statsOfSpec = mapSpecIdToStats(talentTreeToSpec(specName, specs));

    return (
        <Container>
            {loading && <Loader />}
            {error && <ErrorMessage message={error} refresh={fetchCharacter} />}

            {!loading && !error && stats && (
                <div>
                    <ProfessionContainer container>
                        {professions.map((profession) => (
                            <Grid item key={profession.name} sm={6}>
                                <StatItem
                                    iconSrc={getProfessionImg(
                                        profession.name.toLowerCase()
                                    )}
                                    iconSize={44}
                                    label={profession.name}
                                    value={profession.value}
                                    isProfession
                                />
                            </Grid>
                        ))}
                    </ProfessionContainer>

                    <Grid container>
                        <Grid item container direction={"column"} sm={6}>
                            {statsOfSpec.primary.map((stat) => {
                                return (
                                    <StatItem
                                        iconSrc={stat.iconName}
                                        iconSize={50}
                                        label={statLabel(stat)}
                                        value={statValue(stat)}
                                        key={stat.label}
                                    />
                                );
                            })}
                        </Grid>
                        <Grid item container direction={"column"} sm={6}>
                            {statsOfSpec.secondary.map((stat) => {
                                return (
                                    <StatItem
                                        iconSrc={stat.iconName}
                                        iconSize={50}
                                        label={statLabel(stat)}
                                        value={statValue(stat)}
                                        key={stat.label}
                                    />
                                );
                            })}
                        </Grid>
                    </Grid>
                </div>
            )}

            {!loading && !error && !stats && (
                <ErrorMessage
                    message={"Something went wrong"}
                    refresh={fetchCharacter}
                />
            )}
        </Container>
    );
}

function StatItem({ isProfession, iconSrc, iconSize, label, value }) {
    return (
        <StatContainer item>
            <div>
                {isProfession ? (
                    <Icon
                        src={iconSrc}
                        style={{
                            height: iconSize,
                            width: iconSize,
                        }}
                    />
                ) : (
                    <StatIcon
                        statName={iconSrc}
                        height={iconSize}
                        width={iconSize}
                    />
                )}
            </div>

            <Grid container direction={"column"}>
                <Grid item>
                    <StatLabel>{label} </StatLabel>
                </Grid>
                <Grid item>{value}</Grid>
            </Grid>
        </StatContainer>
    );
}

export default CharacterStats;
