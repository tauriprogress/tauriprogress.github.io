import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import AlignedRankDisplay from "../AlignedRankDisplay";
import ConditionalWrapper from "../ConditionalWrapper";
import DateTooltip from "../DateTooltip";
import DisplayDate from "../DisplayDate";
import ErrorMessage from "../ErrorMessage";
import Link from "../Link";
import Loading from "../Loading";
import OverflowScroll from "../OverflowScroll";
import WithRealm from "../WithRealm";
import GuildListFilter from "./GuildListFilter";

import { dateToString } from "../../helpers";
import { filterGuildList, getGuildProgress, isActiveGuild } from "./helpers";

import { guildListFetch } from "../../redux/actions";
import {
    environmentBossCountSelector,
    environmentDifficultiesSelector,
    environmentDifficultyNamesSelector,
    guildListEntireSelector,
} from "../../redux/selectors";
import { withRealmGroupName } from "../Router/withRealmGroupName";

import { styled, useTheme } from "@mui/material";

const Cell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(1),
}));

const Rank = styled(AlignedRankDisplay)(({ theme }) => ({
    "& p": {
        fontSize: `${18 / 16}rem`,
    },
}));

const Name = styled(Typography)(({ theme }) => ({
    fontSize: `${18 / 16}rem`,
    lineHeight: `${20 / 16}rem`,
}));

const CustomTableCell = styled(TableCell)(({ theme }) => ({
    paddingTop: "0px",
    paddingLeft: theme.spacing(10),
}));

const ProgressionText = styled("span")(({ theme }) => ({
    fontWeight: "bold",
    fontSize: `${20 / 16}rem`,
    display: "inline-block",
    minWidth: "64px",
}));

const ProgressionSecondaryText = styled(ProgressionText)(
    GetSecondaryTextStyles
);

const SecondaryText = styled("span")(GetSecondaryTextStyles);

const ProgressionContainer = styled(Typography)(({ theme }) => ({
    fontSize: `${18 / 16}rem`,
    lineHeight: `${20 / 16}rem`,
}));

const ActivityText = styled("span")(({ theme, active }) => ({
    color: active ? theme.palette.success.light : theme.palette.error.light,
    fontSize: `${10 / 16}rem`,
    marginRight: "1px",
    textAlign: "left",
    fontWeight: "bold",
}));

const Loader = styled(Loading)(({ theme }) => ({
    width: "100vw",
}));

function GetSecondaryTextStyles({ theme }) {
    return {
        color: theme.palette.text.secondary,
        fontSize: `${11 / 16}rem`,
        lineHeight: `${11 / 16}rem`,
    };
}

function GuildList({ realmGroupName }) {
    const theme = useTheme();
    const { factionColors, success } = theme.palette;

    const { data, loading, error, bossCount } = useSelector(
        (state) => ({
            ...guildListEntireSelector(state),
            bossCount: environmentBossCountSelector(state),
        }),
        shallowEqual
    );

    const rowsPerPage = 50;

    const [filter, setFilter] = useState({
        realm: "",
        f: "",
        difficulty: "",
        activity: "",
    });

    const [page, setPage] = useState(0);

    const [showActivity, setShowActivity] = useState(false);
    function toggleActivity() {
        setShowActivity(!showActivity);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(guildListFetch(realmGroupName));
    }, [realmGroupName, dispatch]);

    const filteredData = filterGuildList(filter, data || []);

    function changePage(e, page) {
        setPage(page);
    }

    function changeFilter(filter) {
        setFilter(filter);
        setPage(0);
    }

    return (
        <React.Fragment>
            {loading && <Loader />}
            {error && (
                <ErrorMessage
                    message={error}
                    refresh={() => dispatch(guildListFetch(realmGroupName))}
                />
            )}
            {!loading && !error && data && (
                <React.Fragment>
                    <GuildListFilter filter={filter} setFilter={changeFilter} />
                    <OverflowScroll>
                        <Table>
                            <GuildListTableHead
                                showActivity={showActivity}
                                toggleActivity={toggleActivity}
                            />
                            <TableBody>
                                {filteredData
                                    .slice(
                                        page * rowsPerPage,
                                        (page + 1) * rowsPerPage
                                    )
                                    .map((guild, index) => {
                                        const progress =
                                            getGuildProgress(guild);

                                        return (
                                            <TableRow key={guild._id} hover>
                                                <RankCell
                                                    {...{
                                                        index,
                                                        page,
                                                        rowsPerPage,
                                                        guild,
                                                        factionColors,
                                                    }}
                                                />
                                                <DifficultyCell
                                                    {...{
                                                        guild,
                                                        progress,
                                                        showActivity,
                                                        bossCount,
                                                    }}
                                                />

                                                <ProgressionCell
                                                    {...{
                                                        filter,
                                                        progress,
                                                        guild,
                                                        success,
                                                        bossCount,
                                                    }}
                                                />
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </OverflowScroll>
                    <TablePagination
                        rowsPerPageOptions={[]}
                        component="div"
                        count={filteredData.length || 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={changePage}
                        ActionsComponent={TablePaginationActions}
                    />
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

function GuildListTableHead({ showActivity, toggleActivity }) {
    return (
        <TableHead>
            <TableRow>
                <CustomTableCell>Guild</CustomTableCell>
                <CustomTableCell align="right">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={showActivity}
                                onChange={toggleActivity}
                                inputProps={{
                                    "aria-label": "primary checkbox",
                                }}
                                color="secondary"
                            />
                        }
                        label="Activity"
                    />
                </CustomTableCell>
                <CustomTableCell align="center">Progression</CustomTableCell>
            </TableRow>
        </TableHead>
    );
}

function RankCell({ index, page, rowsPerPage, guild, factionColors }) {
    return (
        <Cell>
            <Rank rank={index + 1 + page * rowsPerPage}>
                <WithRealm realmName={guild.realm}>
                    <Name>
                        <Link
                            style={{
                                color: guild.f
                                    ? factionColors.horde
                                    : factionColors.alliance,
                            }}
                            to={`/guild/${guild.name}?realm=${guild.realm}`}
                        >
                            {guild.name}
                        </Link>
                    </Name>
                </WithRealm>
            </Rank>
        </Cell>
    );
}

function DifficultyCell({ guild, progress, showActivity, bossCount }) {
    const { difficultyNames, difficulties } = useSelector(
        (state) => ({
            difficultyNames: environmentDifficultyNamesSelector(state),
            difficulties: environmentDifficultiesSelector(state),
        }),
        shallowEqual
    );

    return (
        <Cell align="right">
            <Grid container direction="column">
                {difficulties.map((difficulty) => {
                    const isActive = isActiveGuild(guild, difficulty);
                    return (
                        <Grid item key={`${guild.name} ${difficulty}`}>
                            {progress[difficulty] ? (
                                <Typography variant="caption">
                                    {showActivity && (
                                        <Tooltip
                                            title={
                                                isActive
                                                    ? `${guild.name} is raiding in ${difficultyNames[difficulty]}`
                                                    : `${guild.name} is not actively raiding in ${difficultyNames[difficulty]} anymore`
                                            }
                                        >
                                            <ActivityText active={isActive}>
                                                {isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </ActivityText>
                                        </Tooltip>
                                    )}

                                    <ConditionalWrapper
                                        condition={progress[difficulty].date}
                                        wrap={(children) => (
                                            <Tooltip
                                                title={dateToString(
                                                    progress[difficulty].date
                                                )}
                                            >
                                                {children}
                                            </Tooltip>
                                        )}
                                    >
                                        <ProgressionSecondaryText>
                                            {
                                                progress[difficulty]
                                                    .bossesDefeated
                                            }
                                            /{bossCount}{" "}
                                            {difficultyNames[difficulty]}
                                        </ProgressionSecondaryText>
                                    </ConditionalWrapper>
                                </Typography>
                            ) : (
                                <Typography variant="caption">
                                    <ProgressionSecondaryText>
                                        0/
                                        {bossCount}{" "}
                                        {difficultyNames[difficulty]}
                                    </ProgressionSecondaryText>
                                </Typography>
                            )}
                        </Grid>
                    );
                })}
            </Grid>
        </Cell>
    );
}

function ProgressionCell({ filter, progress, guild, success, bossCount }) {
    const firstKill = guild.progression.completion.completed
        ? new Date(guild.progression.completion.completed * 1000)
        : false;
    return (
        <Cell align="right">
            <ProgressionContainer>
                <React.Fragment>
                    {filter.difficulty
                        ? progress[filter.difficulty].date && (
                              <Typography component="span">
                                  <DateTooltip
                                      date={progress[filter.difficulty].date}
                                  >
                                      <DisplayDate
                                          date={
                                              progress[filter.difficulty].date
                                          }
                                      />
                                  </DateTooltip>
                              </Typography>
                          )
                        : firstKill && (
                              <Typography component="span">
                                  <DateTooltip date={firstKill}>
                                      <DisplayDate date={firstKill} />
                                  </DateTooltip>
                              </Typography>
                          )}

                    <ProgressionText>
                        {filter.difficulty ? (
                            <span
                                style={{
                                    color:
                                        progress[filter.difficulty].date &&
                                        success.main,
                                }}
                            >
                                {progress[filter.difficulty].bossesDefeated}
                            </span>
                        ) : (
                            <span
                                style={{
                                    color: firstKill && success.main,
                                }}
                            >
                                {guild.progression.completion.bossesDefeated}
                            </span>
                        )}

                        <SecondaryText>/ {bossCount}</SecondaryText>
                    </ProgressionText>
                </React.Fragment>
            </ProgressionContainer>
        </Cell>
    );
}

export default withRealmGroupName(React.memo(GuildList));
