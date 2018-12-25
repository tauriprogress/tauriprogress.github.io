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
            minWidth: "auto !important"
        },
        selected: {
            color: "white",
            fontWeight: "auto"
        }
    },
    MuiTabs: {
        root: {
            backgroundColor: palette.primary.main
        }
    }
};
export default createMuiTheme({
    palette,
    overrides
});
