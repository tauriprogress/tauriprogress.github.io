import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import Raid from "../Raid";
import Guild from "../Guild";
import Character from "../Character";
import FightLog from "../FightLog";
import ModalFightLog from "../FightLog/Modal";
import GuildList from "../GuildList";
import CharacterLeaderboard from "../CharacterLeaderboard";
import GuildLeaderboard from "../GuildLeaderboard";

import NotFound from "../NotFound";

function RouteSwitch() {
    const location = useLocation();
    const background = location.state && location.state.background;

    return (
        <React.Fragment>
            <Switch location={background || location}>
                <Route
                    exact
                    path={["/", "/seasonal"]}
                    render={() => <GuildList />}
                />
                <Route
                    exact
                    path={[
                        "/raid/:raidName/:bossName?",
                        "/seasonal/raid/:raidName/:bossName?"
                    ]}
                    component={Raid}
                />
                <Route
                    exact
                    path={["/guild/:guildName", "/seasonal/guild/:guildName"]}
                    component={Guild}
                />
                <Route
                    exact
                    path={[
                        "/character/:characterName",
                        "/seasonal/character/:characterName"
                    ]}
                    component={Character}
                />
                <Route
                    exact
                    path={["/log/:logId", "/seasonal/log/:logId"]}
                    component={FightLog}
                />
                <Route
                    exact
                    path={[
                        "/leaderboard/character",
                        "/seasonal/leaderboard/character"
                    ]}
                    component={CharacterLeaderboard}
                />

                <Route
                    exact
                    path={["/leaderboard/guild", "/seasonal/leaderboard/guild"]}
                    component={GuildLeaderboard}
                />
                <Route component={NotFound} />
            </Switch>
            {background && (
                <Route
                    exact
                    path={["/log/:logId", "/seasonal/log/:logId"]}
                    component={ModalFightLog}
                />
            )}
        </React.Fragment>
    );
}

export default RouteSwitch;
