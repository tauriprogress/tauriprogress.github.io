import { createMuiTheme } from "@material-ui/core/styles";

const palette = {
    primary: {
        main: "#1e1f26"
    },
    secondary: {
        main: "#f25c00"
    }
};

const overrides = {
    MuiTab: {
        root: {
            minWidth: "auto !important",
            color: "grey !important",
            "&$selected": {
                color: "white !important"
            }
        }
    },
    MuiTabs: {
        root: {
            backgroundColor: palette.primary.main
        }
    },
    MuiTableBody: {
        root: {
            "& tr:nth-child(odd)": {
                backgroundColor: "white"
            },
            "& tr:hover": {
                backgroundColor: "#e2e3e8"
            }
        }
    },
    MuiChip: {
        root: {
            margin: "5px"
        },
        label: {
            whiteSpace: "normal"
        }
    }
};
export default createMuiTheme({
    palette,
    overrides
});
