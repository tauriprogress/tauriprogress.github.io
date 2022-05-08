import React from "react";

import { talentsFromString } from "../../helpers";
import { shallowEqual, useSelector } from "react-redux";
import {
    environmentIconUrlSelector,
    environmentShootUrlSelector,
    environmentTalentsSelector,
} from "../../redux/selectors";
import { Avatar } from "@mui/material";

function Talents({ char }) {
    const { talents, iconUrl, shootUrl } = useSelector((state) => {
        return {
            talents: environmentTalentsSelector(state),
            iconUrl: environmentIconUrlSelector(state),
            shootUrl: environmentShootUrlSelector(state),
        };
    }, shallowEqual);
    return talentsFromString(char.talents, char.class, talents).map(
        (talent) => (
            <Avatar
                key={talent.label}
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href={`${shootUrl}/?spell=${talent.id}`}
                src={`${iconUrl}/medium/${talent.image}`}
            />
        )
    );
}

export default Talents;
