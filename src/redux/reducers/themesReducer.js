import "typeface-roboto";

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
const darkComponentBackground = "#30303B";

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
        darkAccent: darkAccent,
        light: light,
        lightAccent: lightAccent,
        secondary: secondary
    },
    qualityColors: {
        5: "#ff8000",
        4: "#a335ee",
        3: "#0070dd",
        2: "#1eff00",
        1: "#fff",
        0: "#9d9d9d"
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
    },
    MuiBackdrop: {
        root: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(3px)"
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
        accent: lightAccent,
        tooltip: light
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
            background: "#a6a6a6"
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
    qualityColors: {
        5: "#B35900",
        4: "#a335ee",
        3: "#0070dd",
        2: "#108A00",
        1: grey[700],
        0: "#9d9d9d"
    },
    weightColors: {
        NaN: light,
        0: light,
        1: deepOrange[200],
        20: deepOrange[400],
        40: deepOrange[500],
        60: deepOrange[700],
        80: deepOrange[800],
        100: deepOrange[900]
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
        accent: darkAccent,
        tooltip: primary
    },
    classColors: {
        1: {
            text: brown[300],
            background: "#936739"
        },
        2: {
            text: pink[300],
            background: "#EF438E"
        },
        3: {
            text: green[400],
            background: "#6F9C30"
        },
        4: {
            text: yellow[400],
            background: "#CCBE00"
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
            background: "#0066CC"
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
            background: "#E06900"
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
    qualityColors: {
        5: "#ff8000",
        4: "#a335ee",
        3: "#0070dd",
        2: "#1eff00",
        1: "#fff",
        0: "#9d9d9d"
    },
    weightColors: {
        NaN: "#2D2D36",
        0: "#2D2D36",
        1: "#6c3124",
        20: "#80321e",
        40: "#953318",
        60: "##aa3512",
        80: "#b5350f",
        100: "#BF360C"
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
                    backgroundColor: darkComponentBackground
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
