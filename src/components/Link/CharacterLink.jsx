import { useDispatch } from "react-redux";
import Link from "./index";
import { characterDataSetNewCharacter } from "../../redux/actions";

function CharacterLink({ name, realm, characterClass, ...props }) {
    const dispatch = useDispatch();

    function onClick() {
        dispatch(
            characterDataSetNewCharacter({
                name,
                realm,
                class: characterClass,
            })
        );
    }

    return <Link {...props} onClick={onClick} />;
}

export default CharacterLink;
