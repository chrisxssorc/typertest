import React, { useState } from 'react';
import {
    BrowerRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Navbar from './Navbar';
import Play from './Play';

const App = () => {
    return (
        <Router>
            <Switch>
                <Navbar />
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/play">
                    <Play />
                </Route>
            </Switch>
        </Router>
    )
};

export default App;