import React from "react";

import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Warning from "@material-ui/icons/Warning";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import difficultyLabels from "../../constants/difficultyLabels";
import valuesCorrectSince from "../../constants/valuesCorrectSince";

import { convertFightTime } from "../DisplayRaid/helpers";

function LogTitle({ data }) {
    return (
        <React.Fragment>
            {data.encounter_data.encounter_name === "Durumu the Forgotten" &&
                data.killtime < valuesCorrectSince && (
                    <React.Fragment>
                        <Chip
                            label={`Durumu damage data is incorrect before ${new Date(
                                valuesCorrectSince * 1000
                            ).toLocaleDateString()} due to a bug.`}
                            avatar={
                                <Avatar>
                                    <Warning color="secondary" />
                                </Avatar>
                            }
                            className="warning"
                            color="primary"
                        />
                        <br />
                    </React.Fragment>
                )}
            {data.killtime < valuesCorrectSince && (
                <Chip
                    label={`Absorb data is incorrect before ${new Date(
                        valuesCorrectSince * 1000
                    ).toLocaleDateString()} due to a bug.`}
                    avatar={
                        <Avatar>
                            <Warning color="secondary" />
                        </Avatar>
                    }
                    className="warning"
                    color="primary"
                />
            )}

            <div className="fightLogTitle">
                <List className="metaDataList" component="ul">
                    <ListItem>
                        <ListItemText primary="Logs" />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={
                                <React.Fragment>
                                    <div className="metaDataListItemContainer">
                                        Guild{" "}
                                        <span className="textBold">
                                            {data.guildid ? (
                                                <Link
                                                    to={`/guild/${
                                                        data.guilddata.name
                                                    }?realm=${data.realm}`}
                                                >
                                                    <span
                                                        className={
                                                            data.guilddata
                                                                .faction === 0
                                                                ? "blue"
                                                                : "red"
                                                        }
                                                    >
                                                        {data.guilddata.name}
                                                    </span>
                                                </Link>
                                            ) : (
                                                "Random"
                                            )}
                                        </span>
                                    </div>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={
                                <React.Fragment>
                                    <div className="metaDataListItemContainer">
                                        Boss name{" "}
                                        <Link
                                            to={`/raid/${data.mapentry.name}/${
                                                data.encounter_data
                                                    .encounter_name
                                            }`}
                                        >
                                            <span className="textBold">
                                                {
                                                    data.encounter_data
                                                        .encounter_name
                                                }
                                            </span>
                                        </Link>
                                    </div>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={
                                <React.Fragment>
                                    <div className="metaDataListItemContainer">
                                        Difficulty{" "}
                                        <span className="textBold">
                                            {difficultyLabels[data.difficulty]}
                                        </span>
                                    </div>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={
                                <React.Fragment>
                                    <div className="metaDataListItemContainer">
                                        Deaths
                                        <span className="textBold">
                                            {data.deaths_fight}
                                        </span>
                                    </div>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={
                                <React.Fragment>
                                    <div className="metaDataListItemContainer">
                                        <span>Resurrects </span>
                                        <span className="textBold">
                                            {data.resurrects_fight}
                                        </span>
                                    </div>
                                </React.Fragment>
                            }
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemText
                            primary={
                                <React.Fragment>
                                    <div className="metaDataListItemContainer">
                                        Time
                                        <span className="textBold">
                                            {convertFightTime(data.fight_time)}
                                        </span>
                                    </div>
                                </React.Fragment>
                            }
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemText
                            primary={
                                <React.Fragment>
                                    <div className="metaDataListItemContainer">
                                        Date{" "}
                                        <span className="textBold">
                                            {new Date(
                                                data.killtime * 1000
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </List>
            </div>
        </React.Fragment>
    );
}

export default LogTitle;
