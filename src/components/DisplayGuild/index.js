import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import GuildProgression from "./GuildProgression";
import GuildRoster from "./GuildRoster";
import GuildLatestKills from "./GuildLatestKills";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import {
    guildFetch,
    guildSetNav,
    charLadderFilterReset
} from "../../redux/actions";

class DisplayGuild extends React.PureComponent {
    componentDidMount() {
        const guildName = this.props.match.params.guildName;
        const realm = new URLSearchParams(this.props.location.search).get(
            "realm"
        );
        this.props.charLadderFilterReset();
        this.props.guildFetch({
            guildName,
            realm
        });
    }

    componentWillUnmount() {
        this.props.charLadderFilterReset();
    }

    render() {
        const {
            palette: { factionColors }
        } = this.props.theme;
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
                            <Typography
                                variant="h4"
                                style={{
                                    color:
                                        data.gFaction === 0
                                            ? factionColors.alliance
                                            : factionColors.horde
                                }}
                            >
                                {data.guildName}
                            </Typography>
                            <Typography variant="caption">
                                {data.guildMembersCount} members
                            </Typography>
                            <Typography variant="caption">
                                {data.realm},{" "}
                                {data.gFaction === 0 ? "Alliance" : "Horde"}
                            </Typography>
                        </div>
                        <div className="displayGuildContentContainer">
                            <AppBar position="static">
                                <Tabs
                                    value={active}
                                    onChange={(e, value) => guildSetNav(value)}
                                    indicatorColor="secondary"
                                    variant="scrollable"
                                    scrollButtons="on"
                                    className="displayGuildNavTabs"
                                >
                                    <Tab label="Progression" className="tab" />
                                    <Tab label="Latest kills" className="tab" />
                                    <Tab label="Roster" className="tab" />
                                </Tabs>
                            </AppBar>
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
        { guildFetch, guildSetNav, charLadderFilterReset },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTheme()(DisplayGuild));
