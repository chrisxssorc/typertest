import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import { getAllPassages } from '../api/index';

import Navbar from './Navbar';
import Play from './Play';
import Home from './Home';

const App = () => {
    const [passages, setPassages] = useState([]);

    useEffect(() => {
        getAllPassages()
        .then((passages) => {
            setPassages(passages);
        })
        .catch(console.error);
    }, []);

    return (
        <Router>
            <Switch>
                <div className="App">
                <Navbar />
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/play">
                    <Play 
                    passages = {passages}
                    />
                </Route>
                </div>
            </Switch>
        </Router>
    )
};

export default App;