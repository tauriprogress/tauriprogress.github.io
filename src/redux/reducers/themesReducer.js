import { createMuiTheme } from "@material-ui/core/styles";
import {
    brown,
    pink,
    green,
    yellow,
    grey,
    red,
    indigo,
    lightBlue,
    deepPurple,
    teal,
    deepOrange
} from "@material-ui/core/colors";

const primary = "#1e1f26";
const secondary = "#f25c00";

const light = "#f6ede2";
const lightAccent = "#faf5ef";
const dark = "#25272f";
const darkAccent = "#2c2f39";

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
            backgroundColor: primary
        }
    },

    MuiChip: {
        root: {
            margin: "5px",
            height: "auto"
        },
        label: {
            whiteSpace: "normal"
        }
    },

    MuiLink: {
        root: {
            textDecoration: "none !important",
            "&:hover": {
                color: `${secondary} !important`
            }
        }
    }
};

const lightPalette = {
    primary: {
        main: primary,
        contrastText: light
    },
    secondary: {
        main: secondary
    },
    error: {
        main: red[900]
    },
    background: {
        default: light
    },
    backgroundAccent: lightAccent,
    classColors: {
        1: brown[700],
        2: pink[700],
        3: green[900],
        4: "#7f7200",
        5: grey[700],
        6: red[800],
        7: indigo[700],
        8: lightBlue[800],
        9: deepPurple[700],
        10: teal[700],
        11: deepOrange[900]
    },
    factionColors: {
        alliance: lightBlue[900],
        horde: red[900]
    },
    progStateColors: {
        alive: red[900],
        defeated: green[900]
    },
    type: "light"
};

const darkPalette = {
    primary: {
        main: primary,
        contrastText: light
    },
    secondary: {
        main: secondary
    },
    error: {
        main: red[900]
    },
    background: {
        default: dark
    },
    backgroundAccent: darkAccent,
    classColors: {
        1: brown[300],
        2: pink[300],
        3: green[400],
        4: yellow[400],
        5: grey[300],
        6: red[300],
        7: indigo[300],
        8: lightBlue[400],
        9: deepPurple[200],
        10: teal[400],
        11: deepOrange[400]
    },
    factionColors: {
        alliance: lightBlue[400],
        horde: red[300]
    },
    progStateColors: {
        alive: red[300],
        defeated: green[400]
    },
    type: "dark"
};

const defaultState = {
    type: localStorage.getItem("themeType") || "dark",
    light: createMuiTheme({
        palette: lightPalette,
        overrides: {
            ...overrides,
            MuiTableBody: {
                root: {
                    "& tr:nth-child(odd)": {
                        backgroundColor: lightPalette.backgroundAccent
                    },
                    "& tr:hover": {
                        backgroundColor: "#e2e3e8"
                    }
                }
            }
        }
    }),
    dark: createMuiTheme({
        palette: darkPalette,
        overrides: {
            ...overrides,
            MuiTableBody: {
                root: {
                    "& tr:nth-child(odd)": {
                        backgroundColor: darkPalette.backgroundAccent
                    },
                    "& tr:hover": {
                        backgroundColor: "#343642"
                    }
                }
            }
        }
    })
};

function themesReducer(state = defaultState, action) {
    switch (action.type) {
        case "THEME_TOGGLE":
            const type = state.type === "light" ? "dark" : "light";
            localStorage.setItem("themeType", type);
            return {
                ...state,
                type: type
            };
        default:
            return state;
    }
}

export default themesReducer;
