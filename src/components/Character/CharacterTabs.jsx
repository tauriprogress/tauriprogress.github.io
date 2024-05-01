import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { getRaidImg } from "../../helpers";

import styled from "@emotion/styled";
import { characterProgressionSetRaid } from "../../redux/actions";
import { environmentRaidsSelector } from "../../redux/selectors";
import { withRealmGroupName } from "../Router/withRealmGroupName";
import CharacterProgression from "./CharacterProgression";
import CharacterRecentKills from "./CharacterRecentKills";

const Container = styled("section")(({ theme }) => ({
    padding: theme.spacing(5),
    minHeight: "100vh",
    "@media only screen and (max-width: 600px)": {
        padding: `${theme.spacing(1)} 0`,
    },
}));

const CustomTabs = styled(Tabs)(({ theme }) => ({
    marginBottom: theme.spacing(5),
}));

const StyledTab = styled(Tab)(({ theme }) => ({
    color: `${theme.palette.primary.contrastText} !important`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
}));

const DefaultTab = styled(Tab)(({ theme }) => ({
    backgroundColor: theme.palette.background.dark,
}));

function CharacterTabs() {
    const raids = useSelector(environmentRaidsSelector);

    const dispatch = useDispatch();

    const [selectedTab, setTab] = useState(0);
    const recentKillsTab = raids.length;

    function selectRaid(raidName) {
        dispatch(characterProgressionSetRaid(raidName));
    }

    return (
        <Container>
            <CustomTabs
                value={selectedTab}
                textColor="secondary"
                indicatorColor="secondary"
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                onChange={(e, newTab) => setTab(newTab)}
            >
                {raids.map((raid, index) => (
                    <StyledTab
                        value={index}
                        key={raid.name}
                        label={raid.name}
                        style={{
                            backgroundImage: `url("${getRaidImg(raid.image)}")`,
                            backgroundSize: "cover",
                        }}
                        onClick={() => selectRaid(raid.name)}
                    />
                ))}
                <DefaultTab value={recentKillsTab} label={"Recent kills"} />
            </CustomTabs>
            {(() => {
                if (selectedTab < raids.length) {
                    return <CharacterProgression />;
                }

                if (selectedTab === recentKillsTab) {
                    return <CharacterRecentKills />;
                }

                return null;
            })()}
        </Container>
    );
}

export default withRealmGroupName(React.memo(CharacterTabs));
