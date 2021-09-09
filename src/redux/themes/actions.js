export const THEME_TOGGLE = "THEME_TOGGLE";

export function themeToggle(payload) {
    return {
        type: THEME_TOGGLE,
        payload
    };
}
