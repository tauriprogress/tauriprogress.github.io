import { CardActions } from "@material-ui/core";
import { access } from "fs";

const defaultState = {
    data: null,
    error: null,
    loading: false
};

function raidReducer(state = defaultState, action) {
    switch (action.type) {
        case "RAID_SET_LOADING":
            return { ...state, loading: action.payload };
        case "RAID_FILL":
            return { ...state, data: action.payload, loading: false };
        case "RAID_SET_ERROR":
            if (!action.payload) {
                action.payload = "Unkown error.";
            }
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}

export default raidReducer;
