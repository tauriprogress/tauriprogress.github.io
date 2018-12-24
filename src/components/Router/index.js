import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navigation from "../Navigation";

import RaidBossListContainer from "../RaidBossListContainer";
import DisplayGuilds from "../DisplayGuilds";
import DisplayRaid from "../DisplayRaid";
import DisplayGuild from "../DisplayGuild";
import DisplayPlayer from "../DisplayPlayer";

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
                                    <DisplayGuilds />
                                </React.Fragment>
                            )}
                        />
                        <Route path="/raid" component={DisplayRaid} />
                        <Route path="/guild" component={DisplayGuild} />
                        <Route path="/player" component={DisplayPlayer} />
                        <Route component={NotFound} />
                    </Switch>
                </main>
            </React.Fragment>
        </BrowserRouter>
    );
}

export default Router;
