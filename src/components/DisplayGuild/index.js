import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import GuildProgression from "./GuildProgression";
import GuildRoster from "./GuildRoster";
import GuildLatestKills from "./GuildLatestKills";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import {
    guildSetError,
    guildSetLoading,
    guildFill,
    guildSetNav
} from "../../redux/actions";

import { serverUrl } from "../../constants/urls";

class DisplayGuild extends React.PureComponent {
    componentDidMount() {
        const guildName = this.props.match.params.guildName;
        const realm = new URLSearchParams(this.props.location.search).get(
            "realm"
        );

        this.props.guildSetLoading(true);
        fetch(`${serverUrl}/getguild`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                guildName: guildName,
                realm: realm
            })
        })
            .then(res => res.json())
            .then(res => {
                if (!res.success) {
                    throw new Error(res.errorstring);
                } else {
                    this.props.guildFill(res.response);
                }
            })
            .catch(err => this.props.guildSetError(err.message));
    }

    render() {
        const {
            data,
            loading,
            error,
            nav: { active }
        } = this.props.guild;
        const { guildSetNav } = this.props;

        return (
            <section className="displayGuild">
                {loading && <Loading />}

                {error && <ErrorMessage message={error} />}

                {!loading && !error && data && (
                    <React.Fragment>
                        <div className="displayGuildTitle">
                            <Typography variant="h4">
                                {data.guildName}
                            </Typography>
                            <Typography variant="caption">
                                {data.guildMembersCount} members
                            </Typography>
                            <Typography variant="caption">
                                {data.realm}
                            </Typography>
                            <Typography variant="caption">
                                {data.gFaction === 0 ? "Alliance" : "Horde"}
                            </Typography>
                        </div>
                        <div className="displayGuildContentContainer">
                            <aside className="displayGuildSideNav">
                                <List component="nav">
                                    <ListItem
                                        onClick={() => guildSetNav(0)}
                                        className="listItem"
                                        button
                                    >
                                        <ListItemText
                                            primary="Progression"
                                            className={
                                                active === 0 ? "active" : ""
                                            }
                                        />
                                    </ListItem>
                                    <ListItem
                                        onClick={() => guildSetNav(1)}
                                        className="listItem"
                                        button
                                    >
                                        <ListItemText
                                            primary="Latest kills"
                                            className={
                                                active === 1 ? "active" : ""
                                            }
                                        />
                                    </ListItem>
                                    <ListItem
                                        onClick={() => guildSetNav(2)}
                                        className="listItem"
                                        button
                                    >
                                        <ListItemText
                                            primary="Roster"
                                            className={
                                                active === 2 ? "active" : ""
                                            }
                                        />
                                    </ListItem>
                                </List>
                            </aside>
                            <div className="displayGuildContent">
                                {active === 0 && (
                                    <GuildProgression
                                        progression={data.progression}
                                    />
                                )}
                                {active === 1 && (
                                    <GuildLatestKills
                                        data={data.progression.latestKills}
                                        realm={data.realm}
                                    />
                                )}
                                {active === 2 && (
                                    <GuildRoster data={data.guildList} />
                                )}
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        guild: state.guild
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { guildSetError, guildSetLoading, guildFill, guildSetNav },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayGuild);
