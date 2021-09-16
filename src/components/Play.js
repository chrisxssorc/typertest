import React, {useState, useEffect} from 'react';
import { getAllPassages } from '../api/index';

const Play = ({setIsActive, setIsStopped, setTime}) => {
    const [playPrompt, setPlayPrompt] = useState({});
    const [passage, setPassage] = useState([]);
    const [testProgress, setTestProgress] = useState([]);
    const [inputText, setInputText] = useState([]);

    useEffect(() => {
        getAllPassages()
        .then((passages) => {
            const randomInt = Math.floor(Math.random() * passages.length)
            setPlayPrompt(passages[randomInt])
            setPassage(passages[randomInt].excerpt.split(''))

            const progress = [];
            passages[randomInt].excerpt.split('').forEach((letter) => {
                let current = {};
                current[letter] = 'white';
                progress.push(current)
            })
            setTestProgress(progress);
        })
        .catch(console.error);
    }, []);

    useEffect(() => {
        const progress = [];
        testProgress.forEach((letter) => {
            for(let key in letter) {
                letter[key] = 'white';
            }
        })

        inputText.forEach((letter, index) => {
            if (letter === passage[index]) {
                testProgress[index][letter] = 'lightgreen';
                progress.push(testProgress[index])
            } else {
                for (let key in testProgress[index]) {
                    testProgress[index][key] = 'pink';
                    progress.push(testProgress[index])
                }
            }
        })

        const final = progress.concat(testProgress.slice(inputText.length))
        setTestProgress(final)
    }, [inputText])

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

    const handleTimer = () => {
        if (inputText.length >= passage.length) {
            handleStop();
        } else {
            handleStart();
        }
    }
    
    return (
        <div className="Play">
            <h1>
                Typing Speed Test
            </h1>
            <div className="prompt">
                {testProgress.map((letter) => {
                    for (let key in letter){
                        if (key === ' '){
                            return (
                                <div style={{backgroundColor: letter[key]}}>
                                    &nbsp;
                                </div>
                            )
                        } else {
                            return (
                                <div style={{backgroundColor: letter[key]}}>
                                    {key}
                                </div>
                            )
                        }
                }})}
            </div>
            <div className="promptInfo">
                From {playPrompt.title} by {playPrompt.author}
            </div>
            <form className="testInput">
                <textarea 
                    id="testTextbox"
                    placeholder="Start Typing..."
                    rows="10"
                    cols="100"
                    onChange={(event) => {
                        handleTimer();
                        setInputText(event.target.value.split(''));
                        }}>
                </textarea>
            </form>
        </div>
    )
};

export default Play;