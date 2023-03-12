import React from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import CollapsableList from "../CollapseableList";
import LogLink from "../LogLink";

import { categorizedLogDates } from "../../helpers";

import { environmentDifficultyNamesSelector } from "../../redux/selectors";

import { styled } from "@mui/material";

const CustomListItem = styled(ListItem)(({ theme }) => ({
    display: "block",
    padding: 0,
}));

const BoldTypography = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
}));

function RecentKills({ logs, realm, children, ...rest }) {
    const logDates = categorizedLogDates(logs);

    const difficultyNames = useSelector(environmentDifficultyNamesSelector);
    return (
        <List {...rest} component="div" disablePadding>
            {children}
            {logDates.map((date, index) => (
                <CustomListItem component="div" key={date.text} disableGutters>
                    <CollapsableList
                        defaultState={!index ? true : false}
                        listTitle={
                            <Typography variant="button">
                                {date.text}
                            </Typography>
                        }
                    >
                        {date.kills.map((log) => (
                            <LogLink
                                color="inherit"
                                logId={log.id}
                                realm={realm}
                                key={log.id}
                            >
                                <ListItem component="li" disableGutters>
                                    <Grid
                                        container
                                        wrap="nowrap"
                                        direction="column"
                                    >
                                        <Grid item>
                                            <BoldTypography>
                                                {log.boss}
                                            </BoldTypography>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                            >
                                                {
                                                    difficultyNames[
                                                        log.difficulty
                                                    ]
                                                }
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        wrap="nowrap"
                                        direction="column"
                                    >
                                        <Grid item>
                                            <Typography align="right">
                                                {log.dateDay}
                                                <br />
                                                {log.dateHours}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                                align="right"
                                                component="p"
                                            >
                                                {log.dateText}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                            </LogLink>
                        ))}
                    </CollapsableList>
                </CustomListItem>
            ))}
        </List>
    );
}

export default RecentKills;
