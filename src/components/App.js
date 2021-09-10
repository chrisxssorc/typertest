import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Navbar from './Navbar';
import Play from './Play';
import Home from './Home';

const App = () => {
    

    return (
        <Router>
            <Switch>
                <div className="App">
                <Navbar />
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/play">
                    <Play />
                </Route>
                </div>
            </Switch>
        </Router>
    )
};

export default App;