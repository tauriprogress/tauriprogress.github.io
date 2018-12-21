import React from "react";
import { Link } from "react-router-dom";
function Navigation() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/raid">Look at raids</Link>
                    </li>
                    <li>
                        <Link to="/guild">Find a guild</Link>
                    </li>
                    <li>
                        <Link to="/player">Find a player</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navigation;
