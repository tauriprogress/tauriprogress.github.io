import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { convertFightLength } from "../../helpers";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

function styles() {
    return {
        text: {
            fontSize: `${30 / 16}rem`,
            textAlign: "center"
        },
        container: {
            paddingTop: "50px"
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
            <Typography className={classes.text}>
                {timeLeft < 1 ? (
                    "Season Started"
                ) : (
                    <span>
                        {nextSeasonName} <br /> {convertFightLength(timeLeft)}
                    </span>
                )}
            </Typography>
        </section>
    );
}

export default withStyles(styles)(SeasonalCountdown);
