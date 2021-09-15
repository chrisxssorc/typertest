import React, {useState, useEffect} from 'react';

const Timer = () => {
    const [isActive, setIsActive] = useState(false);
    const [isStopped, setIsStopped] = useState(false);
    const [time, setTime] = useState(0);

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
        <div></div>
    )
}

export default Timer;