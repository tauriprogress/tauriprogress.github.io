import React from "react";

import Header from "../Header";
import SideNavigation from "../SideNavigation";
import OverflowScroll from "../OverflowScroll";
import { styled } from "@mui/system";

const PageContentContainer = styled("div")({
    width: "100%",
    display: "flex",
});

const FlexOverflowScroll = styled(OverflowScroll)(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
}));

function AppContainer({ children }) {
    return (
        <React.Fragment>
            <Header />
            <PageContentContainer>
                <SideNavigation />
                <FlexOverflowScroll>
                    <main>{children}</main>
                </FlexOverflowScroll>
            </PageContentContainer>
        </React.Fragment>
    );
}

export default AppContainer;
