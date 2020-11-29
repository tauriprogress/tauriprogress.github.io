import React from "react";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";

import AppContainer from "../AppContainer";

import Raid from "../Raid";
import Guild from "../Guild";
import Character from "../Character";
import FightLog from "../FightLog";
import ModalFightLog from "../FightLog/Modal";
import TauriApi from "../TauriApi";
import GuildList from "../GuildList";
import Leaderboard from "../Leaderboard";

import NotFound from "../NotFound";

function RouteSwitch() {
    const location = useLocation();
    const background = location.state && location.state.background;
    return (
        <AppContainer>
            <Switch location={background || location}>
                <Route exact path="/" render={() => <GuildList />} />
                <Route
                    exact
                    path="/raid/:raidName/:bossName?"
                    component={Raid}
                />
                <Route exact path="/guild/:guildName" component={Guild} />
                <Route
                    exact
                    path="/character/:characterName"
                    component={Character}
                />
                <Route exact path="/log/:logId" component={FightLog} />
                <Route exact path="/leaderboard" component={Leaderboard} />

                <Route exact path="/secret" component={TauriApi} />
                <Route
                    path="/player"
                    component={() => (
                        <Redirect
                            to={`${location.pathname.replace(
                                "player",
                                "character"
                            )}${location.search}`}
                        />
                    )}
                />
                <Route component={NotFound} />
            </Switch>
            {background && (
                <Route exact path="/log/:logId" component={ModalFightLog} />
            )}
        </AppContainer>
    );
}

export default RouteSwitch;
