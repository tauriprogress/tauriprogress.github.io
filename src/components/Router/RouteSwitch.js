import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import AppContainer from "../AppContainer";

import RaidContainer from "../RaidContainer";
import Guild from "../Guild";
//import Player from "../Player";
import FightLog from "../FightLog";
import ModalFightLog from "../FightLog/Modal";
import TauriApi from "../TauriApi";
import GuildList from "../GuildList";

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
        </AppContainer>
    );
}

export default RouteSwitch;
