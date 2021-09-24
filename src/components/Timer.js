import React, { useEffect } from 'react';

const Timer = ({isActive, isStopped, time, setTime}) => {

    useEffect(() => {
        let interval = null;

        if (isActive && !isStopped) {
            interval = setInterval(() => {
                setTime((time) => time + 1)
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        }
    }, [isActive, isStopped]);

    return (
        <div className="timer">
            <h1>{new Date(time * 1000).toISOString().substr(14, 5)}</h1>
        </div>
    )
}

export default Timer;