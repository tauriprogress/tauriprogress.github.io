import "typeface-roboto";
import "typeface-b612-mono";

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
const darkPSecondary = "#FF8337";
const lightPSecondary = "#B84600";

const light = "#f6ede2";
const lightAccent = "#faf5ef";
const dark = "#25272f";
const darkAccent = "#2c2f39";

const lightGrey = "#c4c4c4";

const defaultClassColors = {
    1: "#c79c6e",
    2: "#f58cba",
    3: "#abd473",
    4: "#fff569",
    5: "#ffffff",
    6: "#c41f3b",
    7: "#0070de",
    8: "#69ccf0",
    9: "#9482c9",
    10: "#00ff96",
    11: "#ff7d0a"
};
const defaultTheme = {
    typography: {
        fontSize: (14 / 16) * 14,
        fontFamily: [
            "Roboto",
            "Open-Sans",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif"
        ].join(",")
    },
    baseColors: {
        dark: primary,
        light: light,
        secondary: secondary
    }
};
const overrides = {
    MuiLink: {
        root: {
            textDecoration: "none !important",
            cursor: "pointer"
        }
    },
    MuiListItem: {
        root: {
            "&$selected": {
                fontWeight: "bold"
            }
        }
    },
    MuiTable: {
        root: {
            whiteSpace: "nowrap"
        }
    },
    MuiTooltip: {
        tooltip: {
            backgroundColor: primary
        }
    },
    MuiTabs: {
        root: {
            backgroundColor: primary,
            color: lightGrey
        }
    },
    MuiTab: {
        root: {
            "&$selected": {
                color: "white"
            },
            minWidth: "80px !important"
        }
    },
    MuiSelect: {
        root: {
            width: "100px"
        }
    },

    MuiAvatar: {
        root: {
            width: "16px",
            height: "16px",
            display: "inline-block",
            transform: "translate(0, 2px)"
        }
    },
    MuiContainer: {
        root: {
            paddingLeft: "0px !important",
            paddingRight: "0px !important",
            maxWidth: "100% !important"
        }
    }
};

const lightPalette = {
    primary: {
        main: primary,
        contrastText: light
    },
    secondary: {
        main: lightPSecondary
    },

    error: {
        main: red[900]
    },
    background: {
        default: light,
        accent: lightAccent
    },
    defaultClassColors,
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
        main: darkPSecondary
    },

    error: {
        main: red[900]
    },
    background: {
        default: dark,
        accent: darkAccent
    },
    defaultClassColors,
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
    type: localStorage.getItem("themeType") || "light",

    light: createMuiTheme({
        ...defaultTheme,
        palette: lightPalette,
        overrides: {
            ...overrides,
            MuiLink: {
                root: {
                    ...overrides.MuiLink.root,
                    "&:hover": {
                        color: `${lightPSecondary} !important`
                    }
                }
            },
            MuiListItem: {
                root: {
                    "&$selected": {
                        ...overrides.MuiListItem.root["&$selected"],
                        color: `${lightPSecondary}`
                    }
                }
            },
            MuiTableBody: {
                root: {
                    "& tr:nth-child(odd)": {
                        backgroundColor: lightPalette.background.accent
                    }
                }
            }
        }
    }),
    dark: createMuiTheme({
        ...defaultTheme,
        palette: darkPalette,
        overrides: {
            ...overrides,
            MuiLink: {
                root: {
                    ...overrides.MuiLink.root,
                    "&:hover": {
                        color: `${darkPSecondary} !important`
                    }
                }
            },
            MuiPaper: {
                root: {
                    backgroundColor: darkAccent
                }
            },
            MuiListItem: {
                root: {
                    "&$selected": {
                        ...overrides.MuiListItem.root["&$selected"],
                        color: `${darkPSecondary}`
                    }
                }
            },
            MuiTableBody: {
                root: {
                    "& tr:nth-child(odd)": {
                        backgroundColor: darkPalette.background.accent
                    }
                }
            },
            MuiTableCell: {
                body: {
                    color: darkPalette.primary.contrastText
                }
            },
            MuiInputLabel: {
                root: {
                    "&$focused": {
                        color: "white !important"
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
