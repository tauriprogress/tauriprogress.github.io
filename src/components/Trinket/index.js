import { useSelector, shallowEqual } from "react-redux";

import Avatar from "@mui/material/Avatar";

import {
    environmentShootUrlSelector,
    environmentIconUrlSelector,
} from "../../redux/selectors";

function Trinket({ id, icon }) {
    const { shootUrl, iconUrl } = useSelector((state) => {
        return {
            shootUrl: environmentShootUrlSelector(state),
            iconUrl: environmentIconUrlSelector(state),
        };
    }, shallowEqual);
    return (
        <Avatar
            component={"a"}
            target="_blank"
            rel="noopener noreferrer"
            href={`${shootUrl}/?item=${id}`}
            src={`${iconUrl}/medium/${icon}.png`}
        />
    );
}

export default Trinket;
