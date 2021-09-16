import React, {useState, useEffect} from 'react';

const Timer = (
    {isActive, 
    setIsActive, 
    isStopped, 
    setIsStopped, 
    time, 
    setTime}) => {

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

    const handleStart = () => {
        setIsActive(true);
        setIsStopped(false);
    }

    const handleStop = () => {
        setIsActive(false);
        setIsStopped(true);
    }

    const handleReset = () => {
        setTime(0);
        setIsActive(false);
    }

    return (
        <div className="timer">
            <div>
                {new Date(time * 1000).toISOString().substr(14, 5)}
            </div>
            <button onClick={handleStart}>Start</button>
            <button onClick={()=>{handleStop(); handleReset()}}>Stop</button>
        </div>
    )
}

export default Timer;