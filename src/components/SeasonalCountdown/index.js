import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { convertFightLength } from "../../helpers";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

function styles() {
    return {
        countdown: {
            fontSize: `${30 / 16}rem`,
            textAlign: "center",
            marginBottom: "20px"
        },
        container: {
            paddingTop: "50px",
            margin: "auto",
            maxWidth: "500px"
        }
    };
}

function SeasonalCountdown({ classes }) {
    const { nextSeasonName, nextStartTime = 0 } = useSelector(
        state => state.seasonal
    );

    const [timeLeft, setTimeLeft] = useState(
        nextStartTime - new Date().getTime()
    );

    const isMounted = React.useRef(true);

    useEffect(() => {
        isMounted.current = true;
        setTimeout(() => {
            if (isMounted.current) {
                setTimeLeft(nextStartTime - new Date().getTime());
            }
        }, 1000);

        return () => (isMounted.current = false);
    }, [nextStartTime, timeLeft]);

    return (
        <section className={classes.container}>
            <Typography className={classes.countdown}>
                {timeLeft < 1 ? (
                    "Season Started"
                ) : (
                    <span>
                        {nextSeasonName} <br /> {convertFightLength(timeLeft)}
                    </span>
                )}
            </Typography>
            <Typography>
                A season starts on the first Wednesday of the month, and ends 3
                months later on the last Wednesday of the month. There is a week
                break between seasons. All data of the previous season is wiped
                for a fresh start.
            </Typography>
            <Typography>
                If you have suggestions, discuss on discord.
            </Typography>
        </section>
    );
}

export default withStyles(styles)(SeasonalCountdown);
