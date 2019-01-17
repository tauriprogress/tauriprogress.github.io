import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function MetaDataList({ className, values, title }) {
    return (
        <List className={className + " metaDataList"} component="ul">
            <ListItem>
                <ListItemText primary={title} />
            </ListItem>
            {values.map((value, index) => (
                <ListItem key={index}>
                    <ListItemText
                        primary={
                            <div className="metaDataListItemContainer">
                                {value.label}
                                <span className={"textBold"}>
                                    {value.value}
                                </span>
                            </div>
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
}

export default MetaDataList;
