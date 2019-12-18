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
    deepOrange,
    orange
} from "@material-ui/core/colors";

const primary = "#1e1f26";
const secondary = deepOrange[500];
const darkPSecondary = deepOrange[300];
const lightPSecondary = deepOrange[900];

const light = "#f6ede2";
const lightAccent = "#faf5ef";
const dark = "#26262f";
const darkAccent = "#2d2d36";

const lightGrey = "#c4c4c4";

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
    },
    MuiList: {
        root: {
            padding: "0px !important"
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
    classColors: {
        1: {
            text: brown[700],
            background: "#c79c6e"
        },
        2: {
            text: pink[700],
            background: "#f58cba"
        },
        3: {
            text: green[900],
            background: "#abd473"
        },
        4: {
            text: "#7f7200",
            background: "#fff569"
        },
        5: {
            text: grey[700],
            background: "#ffffff"
        },
        6: {
            text: red[800],
            background: "#c41f3b"
        },
        7: {
            text: indigo[700],
            background: "#0070de"
        },
        8: {
            text: lightBlue[800],
            background: "#69ccf0"
        },
        9: {
            text: deepPurple[700],
            background: "#9482c9"
        },
        10: {
            text: teal[700],
            background: "#00ff96"
        },
        11: {
            text: orange[900],
            background: "#ff7d0a"
        }
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
    classColors: {
        1: {
            text: brown[300],
            background: "#815b32"
        },
        2: {
            text: pink[300],
            background: "#ed2c80"
        },
        3: {
            text: green[400],
            background: "#61892a"
        },
        4: {
            text: yellow[400],
            background: "#b3a700"
        },
        5: {
            text: grey[300],
            background: "#a6a6a6"
        },
        6: {
            text: red[300],
            background: "#b71c1c"
        },
        7: {
            text: indigo[300],
            background: "#005ab3"
        },
        8: {
            text: lightBlue[400],
            background: "#159fd1"
        },
        9: {
            text: deepPurple[200],
            background: "#9482c9"
        },
        10: {
            text: teal[400],
            background: "#00b369"
        },
        11: {
            text: orange[800],
            background: "#b35400"
        }
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
