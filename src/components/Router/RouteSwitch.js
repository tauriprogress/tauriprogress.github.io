import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import Header from "../Header";

import Home from "../Home";
import RaidContainer from "../RaidContainer";
import Guild from "../Guild";
//import Player from "../Player";
import FightLog from "../FightLog";
import ModalFightLog from "../FightLog/Modal";
import TauriApi from "../TauriApi";

import NotFound from "../NotFound";

function RouteSwitch() {
    const location = useLocation();
    const background = location.state && location.state.background;
    return (
        <React.Fragment>
            <Header />
            <main>
                <Switch location={background || location}>
                    <Route exact path="/" render={Home} />
                    <Route
                        exact
                        path="/raid/:raidName/:bossName?"
                        component={RaidContainer}
                    />
                    <Route exact path="/guild/:guildName" component={Guild} />
                    {/*
                    <Route
                        exact
                        path="/player/:playerName"
                        component={Player}
                    />
                    */}
                    <Route exact path="/log/:logId" component={FightLog} />
                    <Route exact path="/secret" component={TauriApi} />
                    <Route component={NotFound} />
                </Switch>
                {background && (
                    <Route exact path="/log/:logId" component={ModalFightLog} />
                )}
            </main>
        </React.Fragment>
    );
}

export default RouteSwitch;
