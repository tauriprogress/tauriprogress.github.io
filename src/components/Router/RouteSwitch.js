import React from "react";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";

import AppContainer from "../AppContainer";

import Page from "../Page";
import Raid from "../Raid";
import Guild from "../Guild";
import Character from "../Character";
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
                <Route
                    exact
                    path="/"
                    render={props => (
                        <Page title={"Tauri Progress"}>
                            <GuildList {...props} />
                        </Page>
                    )}
                />
                <Route
                    exact
                    path="/raid/:raidName/:bossName?"
                    component={props => (
                        <Page
                            title={`${
                                props.match.params.bossName ||
                                props.match.params.raidName
                            } | Tauri Progress`}
                        >
                            <Raid {...props} />
                        </Page>
                    )}
                />
                <Route exact path="/guild/:guildName" component={Guild} />
                <Route
                    exact
                    path="/character/:characterName"
                    component={props => (
                        <Page
                            title={`${props.match.params.characterName} | Tauri Progress`}
                        >
                            <Character {...props} />
                        </Page>
                    )}
                />
                <Route
                    exact
                    path="/log/:logId"
                    component={props => (
                        <Page
                            title={`Log ${props.match.params.logId} | Tauri Progress`}
                        >
                            <FightLog {...props} />
                        </Page>
                    )}
                />
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
                <Route
                    component={props => (
                        <Page title={`Not Found | Tauri Progress`}>
                            <NotFound {...props} />
                        </Page>
                    )}
                />
            </Switch>
            {background && (
                <Route
                    exact
                    path="/log/:logId"
                    component={props => (
                        <Page
                            title={`Log ${props.match.params.logId} | Tauri Progress`}
                        >
                            <ModalFightLog {...props} />
                        </Page>
                    )}
                />
            )}
        </AppContainer>
    );
}

export default RouteSwitch;
