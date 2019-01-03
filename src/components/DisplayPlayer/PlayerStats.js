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
            <List className="displayPlayerStatsList">
                <Paper>
                    <ListItem>
                        <ListItemText primary="General" />
                    </ListItem>
                </Paper>
                <ListItem>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                TOT HC:{" "}
                                <span className="textBold">
                                    {getBossesDefeated(data.progression)}
                                </span>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                Achievements:{" "}
                                <span className="textBold">{data.pts}</span>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                Level:{" "}
                                <span className="textBold">{data.level}</span>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                Ilvl:{" "}
                                <span className="textBold">
                                    {data.avgitemlevel}
                                </span>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
            <List className="displayPlayerStatsList">
                <Paper>
                    <ListItem>
                        <ListItemText primary="Primary Stats" />
                    </ListItem>
                </Paper>
                <ListItem>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                Armor:{" "}
                                <span className="textBold">
                                    {data.characterStat.effective_armor}
                                </span>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                Stamina:{" "}
                                <span className="textBold">
                                    {data.characterStat.effective_stamina}
                                </span>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                Strength:{" "}
                                <span className="textBold">
                                    {data.characterStat.effective_strength}
                                </span>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                Agility:{" "}
                                <span className="textBold">
                                    {data.characterStat.effective_agility}
                                </span>
                            </React.Fragment>
                        }
                    />
                </ListItem>

                <ListItem>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                Intellect:{" "}
                                <span className="textBold">
                                    {data.characterStat.effective_intellect}
                                </span>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                Spirit:{" "}
                                <span className="textBold">
                                    {data.characterStat.effective_spirit}
                                </span>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
            <List className="displayPlayerStatsList">
                <Paper>
                    <ListItem>
                        <ListItemText primary="Secondary Stats" />
                    </ListItem>
                </Paper>
                <ListItem>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                Attack power:{" "}
                                <span className="textBold">
                                    {data.characterStat
                                        .bonus_strength_attackpower +
                                        data.characterStat
                                            .bonus_agility_attackpower}
                                </span>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                Spell power:{" "}
                                <span className="textBold">
                                    {data.characterStat.heal_bonus}
                                </span>
                            </React.Fragment>
                        }
                    />
                </ListItem>

                <ListItem>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                Hit:{" "}
                                <span className="textBold">
                                    {data.characterStat.melee_hit_rating}
                                </span>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                Crit:{" "}
                                <span className="textBold">
                                    {data.characterStat.melee_crit_rating}
                                </span>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                Haste:{" "}
                                <span className="textBold">
                                    {data.characterStat.hasterating_melee_dmg}
                                </span>
                            </React.Fragment>
                        }
                    />
                </ListItem>

                <ListItem>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                Dodge:{" "}
                                <span className="textBold">
                                    {data.characterStat.dodge_chance}
                                </span>
                            </React.Fragment>
                        }
                    />
                </ListItem>

                <ListItem>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                Parry:{" "}
                                <span className="textBold">
                                    {data.characterStat.parry_chance}
                                </span>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        </Card>
    );
}

export default PlayerStats;
