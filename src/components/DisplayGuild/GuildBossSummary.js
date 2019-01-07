import React from "react";

import Typography from "@material-ui/core/Typography";

import { convertFightTime } from "../DisplayRaid/helpers";

function GuildBossSummary({ data }) {
    return (
        <div className="displayGuildBossSummary">
            {data !== undefined ? (
                <React.Fragment>
                    <Typography>
                        Kills:{" "}
                        <span className="textBold">{data.killCount}</span>
                    </Typography>
                    <Typography>
                        First kill:{" "}
                        <span className="textBold">
                            {new Date(
                                data.firstKill * 1000
                            ).toLocaleDateString()}
                        </span>
                    </Typography>
                    <Typography>
                        Fastest kill:
                        <span className="textBold">
                            {" "}
                            {convertFightTime(data.fastestKill)}
                        </span>
                    </Typography>{" "}
                </React.Fragment>
            ) : (
                <Typography>
                    <span className="red">
                        Selected boss has not been defeated
                    </span>
                </Typography>
            )}
        </div>
    );
}

export default GuildBossSummary;
