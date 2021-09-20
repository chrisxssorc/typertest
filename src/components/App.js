import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Navbar from './Navbar';
import Play from './Play';
import Home from './Home';
import Timer from './Timer';

const App = () => {
    const [isActive, setIsActive] = useState(false);
    const [isStopped, setIsStopped] = useState(false);
    const [time, setTime] = useState(0);

    return (
        <Router>
            <Switch>
                <div className="App">
                <Navbar />
                <Route exact path="/">
                    <div className="playPage">
                        <Play 
                        setIsActive={setIsActive}
                        setIsStopped={setIsStopped}
                        setTime={setTime}
                        time={time} />
                        <Timer
                        isActive={isActive}
                        isStopped={isStopped}
                        time={time}
                        setTime={setTime} />
                    </div>
                </Route>
                </div>
            </Switch>
        </Router>
    )
};

export default App;