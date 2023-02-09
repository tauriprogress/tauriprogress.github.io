import { useParams } from "react-router-dom";

export function withRealmGroupName(Component) {
    return ({ ...props }) => {
        const params = useParams();
        return <Component realmGroupName={params.realmGroupName} {...props} />;
    };
}
