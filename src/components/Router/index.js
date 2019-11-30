import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navigation from "../Navigation";

import RaidBossListContainer from "../RaidBossListContainer";
import GuildList from "../GuildList";
import RaidContainer from "../RaidContainer";
import Guild from "../Guild";
import Player from "../Player";
import FightLog from "../FightLog";
import TauriApi from "../TauriApi";

import NotFound from "../NotFound";

function Router() {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Navigation />
                <main>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <React.Fragment>
                                    <RaidBossListContainer />
                                    <GuildList />
                                </React.Fragment>
                            )}
                        />
                        <Route
                            exact
                            path="/raid/:raidName/:bossName?"
                            component={RaidContainer}
                        />
                        <Route
                            exact
                            path="/guild/:guildName"
                            component={Guild}
                        />
                        <Route
                            exact
                            path="/player/:playerName"
                            component={Player}
                        />
                        <Route exact path="/log/:logId" component={FightLog} />
                        <Route exact path="/secret" component={TauriApi} />
                        <Route component={NotFound} />
                    </Switch>
                </main>
            </React.Fragment>
        </BrowserRouter>
    );
}

export default Router;
