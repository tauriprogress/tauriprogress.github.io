import React from "react";

import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";

import { getBossesDefeated } from "./helpers";

function PlayerStats({ data }) {
    return (
        <Card className="displayPlayerStats">
            <List className="metaDataList">
                <Paper>
                    <ListItem>
                        <ListItemText primary="General" />
                    </ListItem>
                </Paper>
                <ListItem>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <div className="metaDataListItemContainer">
                                    TOT HC:{" "}
                                    <span className="textBold">
                                        {getBossesDefeated(data.progression)}
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
                                    Achievements:{" "}
                                    <span className="textBold">{data.pts}</span>
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
                                    Level:{" "}
                                    <span className="textBold">
                                        {data.level}
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
                                    Ilvl:{" "}
                                    <span className="textBold">
                                        {data.avgitemlevel}
                                    </span>
                                </div>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
            <List className="metaDataList">
                <Paper>
                    <ListItem>
                        <ListItemText primary="Primary Stats" />
                    </ListItem>
                </Paper>
                <ListItem>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <div className="metaDataListItemContainer">
                                    Armor:{" "}
                                    <span className="textBold">
                                        {data.characterStat.effective_armor}
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
                                    Stamina:{" "}
                                    <span className="textBold">
                                        {data.characterStat.effective_stamina}
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
                                    Strength:{" "}
                                    <span className="textBold">
                                        {data.characterStat.effective_strength}
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
                                    Agility:{" "}
                                    <span className="textBold">
                                        {data.characterStat.effective_agility}
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
                                    Intellect:{" "}
                                    <span className="textBold">
                                        {data.characterStat.effective_intellect}
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
                                    Spirit:{" "}
                                    <span className="textBold">
                                        {data.characterStat.effective_spirit}
                                    </span>
                                </div>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
            <List className="metaDataList">
                <Paper>
                    <ListItem>
                        <ListItemText primary="Secondary Stats" />
                    </ListItem>
                </Paper>
                <ListItem>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <div className="metaDataListItemContainer">
                                    Attack power:{" "}
                                    <span className="textBold">
                                        {data.characterStat
                                            .bonus_strength_attackpower +
                                            data.characterStat
                                                .bonus_agility_attackpower}
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
                                    Spell power:{" "}
                                    <span className="textBold">
                                        {data.characterStat.heal_bonus}
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
                                    Hit:{" "}
                                    <span className="textBold">
                                        {data.characterStat.melee_hit_rating}
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
                                    Crit:{" "}
                                    <span className="textBold">
                                        {data.characterStat.melee_crit_rating}
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
                                    Haste:{" "}
                                    <span className="textBold">
                                        {
                                            data.characterStat
                                                .hasterating_melee_dmg
                                        }
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
                                    Dodge:{" "}
                                    <span className="textBold">
                                        {data.characterStat.dodge_chance}
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
                                    Parry:{" "}
                                    <span className="textBold">
                                        {data.characterStat.parry_chance}
                                    </span>
                                </div>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        </Card>
    );
}

export default PlayerStats;
