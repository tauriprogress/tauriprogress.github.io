import { devEnv } from "../../helpers";
import { getCurrentRealmGroupName } from "../../redux/history/helpers";

export function getPatreonRedirect() {
    let baseUrl = devEnv
        ? "http://localhost:3000"
        : "https://tauriprogress.github.io";

    return `${baseUrl}/${getCurrentRealmGroupName()}/login`;
}
