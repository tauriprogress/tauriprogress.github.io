import { characterSpecClass } from "tauriprogress-constants";
import { isClassId } from "../../helpers";

export function getClassColor(classOrSpec, classColors) {
    if (!classOrSpec) return "inherit";

    let characterClass = classOrSpec;
    if (!isClassId(characterClass)) {
        characterClass = characterSpecClass[characterClass];
    }

    return classColors[characterClass].text;
}
