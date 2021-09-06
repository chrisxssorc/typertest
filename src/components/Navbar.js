import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Navbar = () => {
    const history = useHistory();

    return (
        <div className="Navbar">
            <Link to="/">
                <div>HOME</div>
            </Link>
            <Link to="/play">
                <div>PLAY</div>
            </Link>
        </div>
    )
};

export default Navbar;