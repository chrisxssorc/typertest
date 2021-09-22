import React, {useState, useEffect} from 'react';
import { getAllPassages } from '../api/index';

const Play = ({setIsActive, setIsStopped, time}) => {
    // One of the prompt objects passed in from API
    const [playPrompt, setPlayPrompt] = useState({});

    // The prompt object's excerpt split into letters
    const [passage, setPassage] = useState([]);

    // The total number of words in the excerpt
    const [totalWords, setTotalWords] = useState(0);

    // The letters of the excerpt denoted green/pink to show progress
    const [testProgress, setTestProgress] = useState([]);

    // The text the user currently has typed in the input form
    const [inputText, setInputText] = useState([]);

    // Bool to indicate the user has finished typing
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        getAllPassages()
        .then((passages) => {
            // Pick a random int
            const randomInt = Math.floor(Math.random() * passages.length);
            // Select one random prompt
            setPlayPrompt(passages[randomInt]);
            // Calculate the total words
            setTotalWords(passages[randomInt].excerpt.split(' ').length);
            // Get a list of each letter in the excerpt
            setPassage(passages[randomInt].excerpt.split(''));
            
            // For each letter, give it a white background color to render
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
        // Reset each letter's background to white
        const progress = [];
        testProgress.forEach((letter) => {
            for(let key in letter) {
                letter[key] = 'white';
            }
        })
        // For each letter in the user's input
        inputText.forEach((letter, index) => {
            // If it matches the excerpt, render a green background
            if (letter === passage[index]) {
                testProgress[index][letter] = 'lightgreen';
                progress.push(testProgress[index])
            } else { // If it doesn't match, render a pink background
                for (let key in testProgress[index]) {
                    testProgress[index][key] = 'pink';
                    progress.push(testProgress[index])
                }
            }
        })
        // Set the new list of letters as current progress, so react can re-render
        const final = progress.concat(testProgress.slice(inputText.length))
        setTestProgress(final)
    }, [inputText])

    // Handlers for starting and stopping the timer
    const handleStart = () => {
        setIsActive(true);
        setIsStopped(false);
    }

    const handleStop = () => {
        setIsActive(false);
        setIsStopped(true);
    }

    const handleTimer = () => {
        // Stop the timer when the input length has exceeded the prompt length
        if (inputText.length >= passage.length - 1) {
            handleStop();
            document.getElementById("testTextbox").disabled = true;
            setIsFinished(true);
        } else {
            handleStart();
        }
    }
    let count = 0;
    return (
        <div className="Play">
            <h1>
                Type the passage below as fast and accurately as possible:
            </h1>
            <div className="prompt">
                {testProgress.map((letter) => {
                    count += 1
                    for (let key in letter){
                        if (key === ' '){
                            if (count >= 100){
                                count = 0;
                                return (
                                    <div style={{backgroundColor: letter[key], flexBasis: "100%", height: "0"}}>
                                        &nbsp;
                                    </div>
                                )
                            } else {
                                return (
                                    <div style={{backgroundColor: letter[key]}}>
                                        &nbsp;
                                    </div>
                                )
                            }
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
            <form className="testInputForm">
                <textarea 
                    id="testTextbox"
                    placeholder="Timer begins when you start typing..."
                    rows="10"
                    cols="100"
                    onChange={(event) => {
                        handleTimer();
                        setInputText(event.target.value.split(''));
                        }}>
                </textarea>
            </form>
            {isFinished
            ? <div className="results">
            <div className="result">
                You typed {totalWords} words in {time} seconds!
            </div>
            <div className="score">
                Your typing speed is {Math.floor((totalWords*60)/time)} WPM (words per minute).
            </div>
            <div className="tryAgain" onClick={()=>{window.location.reload()}}>
                Try Again
            </div>
            </div>
            : <></>
            }
        </div>
    )
};

export default Play;