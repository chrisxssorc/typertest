import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Navbar = () => {
    const history = useHistory();

    return (
        <div className="Navbar">
            <h1>TyperTest</h1>
        </div>
    )
};

export default Navbar;