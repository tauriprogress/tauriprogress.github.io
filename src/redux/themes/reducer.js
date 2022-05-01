import "typeface-roboto";
import { deepmerge } from "@mui/utils";

import { createTheme } from "@mui/material/styles";
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
    orange,
} from "@mui/material/colors";

import { THEME_TOGGLE } from "./actions";

const primary = "#111111";
const secondary = deepOrange[500];

const light = "#f9f9f9";
const lightAccent = "#efefef";
const lightBackgroundDefault = light;
const lightBackgroundLighter = "#fefefe";
const lightBackgroundDarker = "#d5d5d5";
const lightPSecondary = deepOrange[900];
const lightWarning = yellow[700];

const dark = "#181818";
const darkAccent = "#1a1a1a";
const darkBackgroundDefault = dark;
const darkBackgroundLighter = "#212121";
const darkBackgroundDarker = "#121212";
const darkPSecondary = deepOrange[300];
const darkWarning = yellow[700];

const baseTheme = {
    palette: {},
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    overflowY: "scroll !important",
                    padding: "0px !important",
                },
                "*": {
                    scrollbarWidth: "thin",
                },
                "*::-webkit-scrollbar": {},
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    display: "inline-block",
                    height: "20px",
                    width: "20px",
                    verticalAlign: "middle",
                    transform: "translateY(-1px)",
                    marginRight: "3px",
                    borderRadius: "3px",
                },
            },
            variants: [
                {
                    props: { variant: "small" },
                    style: {
                        height: "18px",
                        width: "18px",
                    },
                },
            ],
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: "none !important",
                    cursor: "pointer",
                    color: "inherit",
                },
            },
        },
        MuiFormControl: {
            defaultProps: {
                size: "small",
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    width: "120px",
                    textTransform: "capitalize",
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    textTransform: "capitalize",
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    textTransform: "capitalize",
                },
            },
        },

        MuiTableCell: {
            styleOverrides: {
                sizeSmall: {
                    paddingTop: "10px",
                    paddingBottom: "10px",
                },
            },
        },

        MuiTable: {
            variants: [
                {
                    props: { variant: "inner" },
                    style: {
                        "& td": {
                            padding: "6px",
                        },
                    },
                },
            ],
        },
    },
    typography: {
        fontSize: (14 / 16) * 14,
        fontFamily: [
            "Roboto",
            "Open-Sans",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
        ].join(","),
    },
    baseColors: {
        dark: primary,
        darkAccent: darkAccent,
        light: light,
        lightAccent: lightAccent,
        secondary: secondary,
    },
    qualityColors: {
        5: "#ff8000",
        4: "#a335ee",
        3: "#0070dd",
        2: "#1eff00",
        1: "#fff",
        0: "#9d9d9d",
    },
};

const lightTheme = createTheme(
    deepmerge(
        {
            components: {},
            palette: {
                mode: "light",
                primary: {
                    main: primary,
                    contrastText: light,
                },
                secondary: {
                    main: lightPSecondary,
                },
                error: {
                    main: red[900],
                },
                background: {
                    default: lightBackgroundDefault,
                    accent: lightAccent,
                    lighter: lightBackgroundLighter,
                    darker: lightBackgroundDarker,
                    tooltip: lightAccent,
                    warning: lightWarning,
                },
                classColors: {
                    1: {
                        text: brown[700],
                        background: "#c79c6e",
                    },
                    2: {
                        text: pink[700],
                        background: "#f58cba",
                    },
                    3: {
                        text: green[900],
                        background: "#abd473",
                    },
                    4: {
                        text: "#7f7200",
                        background: "#fff569",
                    },
                    5: {
                        text: grey[700],
                        background: "#a6a6a6",
                    },
                    6: {
                        text: red[800],
                        background: "#c41f3b",
                    },
                    7: {
                        text: indigo[700],
                        background: "#0070de",
                    },
                    8: {
                        text: lightBlue[800],
                        background: "#69ccf0",
                    },
                    9: {
                        text: deepPurple[700],
                        background: "#9482c9",
                    },
                    10: {
                        text: teal[700],
                        background: "#00ff96",
                    },
                    11: {
                        text: orange[900],
                        background: "#ff7d0a",
                    },
                },
                factionColors: {
                    alliance: lightBlue[900],
                    horde: red[900],
                },
                progStateColors: {
                    alive: red[900],
                    defeated: green[900],
                },
                qualityColors: {
                    5: "#B35900",
                    4: "#a335ee",
                    3: "#0070dd",
                    2: "#108A00",
                    1: grey[700],
                    0: "#9d9d9d",
                },
                weightColors: {
                    NaN: light,
                    0: light,
                    1: deepOrange[200],
                    20: deepOrange[400],
                    40: deepOrange[500],
                    60: deepOrange[700],
                    80: deepOrange[800],
                    100: deepOrange[900],
                },
            },
        },
        baseTheme
    )
);

const darkTheme = createTheme(
    deepmerge(
        {
            components: {},

            palette: {
                mode: "dark",
                primary: {
                    main: primary,
                    contrastText: light,
                },
                error: {
                    ...lightTheme.palette.error,
                },
                warning: {
                    ...lightTheme.palette.warning,
                },
                secondary: {
                    main: darkPSecondary,
                },
                background: {
                    default: darkBackgroundDefault,
                    accent: darkAccent,
                    lighter: darkBackgroundLighter,
                    darker: darkBackgroundDarker,
                    tooltip: darkAccent,
                    warning: darkWarning,
                },
                classColors: {
                    1: {
                        text: brown[300],
                        background: "#936739",
                    },
                    2: {
                        text: pink[300],
                        background: "#EF438E",
                    },
                    3: {
                        text: green[400],
                        background: "#6F9C30",
                    },
                    4: {
                        text: yellow[400],
                        background: "#CCBE00",
                    },
                    5: {
                        text: grey[300],
                        background: "#a6a6a6",
                    },
                    6: {
                        text: red[300],
                        background: "#b71c1c",
                    },
                    7: {
                        text: indigo[300],
                        background: "#0066CC",
                    },
                    8: {
                        text: lightBlue[400],
                        background: "#159fd1",
                    },
                    9: {
                        text: deepPurple[200],
                        background: "#9482c9",
                    },
                    10: {
                        text: teal[400],
                        background: "#00b369",
                    },
                    11: {
                        text: orange[800],
                        background: "#E06900",
                    },
                },
                factionColors: {
                    alliance: lightBlue[400],
                    horde: red[300],
                },
                progStateColors: {
                    alive: red[300],
                    defeated: green[400],
                },
                qualityColors: {
                    5: "#ff8000",
                    4: "#a335ee",
                    3: "#0070dd",
                    2: "#1eff00",
                    1: "#fff",
                    0: "#9d9d9d",
                },
                weightColors: {
                    NaN: "#2b3138",
                    0: "#2b3138",
                    1: "#64372d",
                    20: "#783927",
                    40: "#823925",
                    60: "#96391e",
                    80: "#ab3817",
                    100: "#BF360C",
                },
                text: {
                    primary: "#dedede",
                },
            },
        },
        baseTheme
    )
);

const defaultState = {
    type: localStorage.getItem("themeType") || "light",
    light: lightTheme,
    dark: darkTheme,
};

function themesReducer(state = defaultState, action) {
    switch (action.type) {
        case THEME_TOGGLE:
            const type = state.type === "light" ? "dark" : "light";
            localStorage.setItem("themeType", type);
            return {
                ...state,
                type: type,
            };
        default:
            return state;
    }
}

export default themesReducer;
