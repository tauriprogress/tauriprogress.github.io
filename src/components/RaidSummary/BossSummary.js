import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";

import { applyFilter } from "./helpers";

function styles(theme) {
    return {
        container: {
            backgroundColor: "pink",
            width: "260px",
            margin: theme.spacing(1)
        }
    };
}

function BossSummary({ classes, bossInfo, data, filter, specs }) {
    const boss = applyFilter(data, filter, specs);
    return (
        <div className={classes.container}>
            <p>
                {bossInfo.name} {boss.killCount} kills
            </p>
            <div>
                <p>First kills</p>
                <ul>
                    {boss.firstKills.map(log => (
                        <li key={log.id}>
                            {log.guild ? log.guild.name : "random"}

                            {log.realm}
                            {log.date}
                        </li>
                    ))}
                </ul>
                <p>Fastest kills</p>
                <ul>
                    {boss.fastestKills.map(log => (
                        <li key={log.id}>
                            {log.guild ? log.guild.name : "random"}
                            {log.realm}
                            {log.fightLength}
                        </li>
                    ))}
                </ul>
            </div>
            <Divider />
            <div>
                <div>
                    <p>DPS</p>
                    <ul>
                        {boss.bestDps.map(character => (
                            <li key={character._id}>
                                {character.name}
                                {character.dps}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p>HPS</p>
                    <ul>
                        {boss.bestHps.map(character => (
                            <li key={character._id}>
                                {character.name}
                                {character.hps}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(BossSummary);
