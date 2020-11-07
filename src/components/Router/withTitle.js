import React from "react";

function withTitle(title) {
    document.title = title;
    return Component => props => {
        return <Component {...props} />;
    };
}

export default withTitle;
