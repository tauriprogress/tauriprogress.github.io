import React from "react";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";

import SearchGuild from "./SearchGuild";
import SearchPlayer from "./SearchPlayer";

class SearchBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            collapse: true
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse() {
        this.setState({ ...this.state, collapse: !this.state.collapse });
    }

    render() {
        return (
            <div className="searchBar">
                <Button onClick={this.toggleCollapse}>
                    Search{" "}
                    {this.state.collapse ? <ExpandLess /> : <ExpandMore />}
                </Button>
                <Collapse
                    in={!this.state.collapse}
                    timeout="auto"
                    unmountOnExit
                >
                    <SearchGuild />
                    <SearchPlayer />
                </Collapse>
            </div>
        );
    }
}

export default SearchBar;
