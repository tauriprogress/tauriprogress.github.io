import React from "react";

import { withStyles } from "@material-ui/styles";

import RaidBossListContainer from "../RaidBossListContainer";
import GuildList from "../GuildList";
import OverflowScroll from "../OverflowScroll";

function styles(theme) {
    return {
        container: {
            maxWidth: "100vw",
            display: "flex",
            [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
                flexWrap: "wrap"
            }
        },
        itemOne: {
            flexGrow: 1,
            textAlign: "center"
        },
        itemTwo: {
            flexGrow: 5,
            margin: "0 10px"
        }
    };
}

const Home = withStyles(styles)(({ classes }) => {
    return (
        <div className={classes.container}>
            <aside className={classes.itemOne}>
                <RaidBossListContainer />
            </aside>
            <OverflowScroll className={classes.itemTwo}>
                <section>
                    <GuildList />
                </section>
            </OverflowScroll>
        </div>
    );
});

function StyledHome() {
    return <Home />;
}

export default StyledHome;
