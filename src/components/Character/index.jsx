import React from "react";
import { validateRealm } from "../Router/validateRealm";

import Page from "../Page";

import { useRouteMatch } from "react-router-dom";
import { capitalize } from "../../helpers";
import CharacterData from "./CharacterData";
import CharacterTabs from "./CharacterTabs";

function Character() {
    const match = useRouteMatch();
    return (
        <Page
            title={`${capitalize(match.params.characterName)} | Tauri Progress`}
        >
            <CharacterData />
            <CharacterTabs />
        </Page>
    );
}

export default validateRealm()(
    React.memo(Character, (prevProps, nextProps) => {
        return JSON.stringify(prevProps) === JSON.stringify(nextProps);
    })
);
