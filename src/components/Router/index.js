import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import Navigation from "../Navigation";

import RaidBossListContainer from "../RaidBossListContainer";
import DisplayGuilds from "../DisplayGuilds";
import DisplayRaid from "../DisplayRaid";
import DisplayGuild from "../DisplayGuild";
import DisplayPlayer from "../DisplayPlayer";
import DisplayRaidBoss from "../DisplayRaidBoss";
import FightLog from "../FightLog";
import TauriApi from "../TauriApi";

import NotFound from "../NotFound";

function Router() {
    return (
        <BrowserRouter>
            <React.Fragment>
                <CssBaseline />
                <Navigation />
                <main>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <React.Fragment>
                                    <RaidBossListContainer />
                                    <DisplayGuilds />
                                </React.Fragment>
                            )}
                        />
                        <Route
                            exact
                            path="/raid/:raidName"
                            component={DisplayRaid}
                        />
                        <Route
                            exact
                            path="/raid/:raidName/:bossName"
                            component={DisplayRaidBoss}
                        />
                        <Route
                            exact
                            path="/guild/:guildName"
                            component={DisplayGuild}
                        />
                        <Route
                            exact
                            path="/player/:playerName"
                            component={DisplayPlayer}
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
