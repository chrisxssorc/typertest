import React, {useState, useEffect} from 'react';
import { getAllPassages } from '../api/index';

const Play = () => {
    const [passage, setPassage] = useState([]);
    const [playPrompt, setPlayPrompt] = useState({});

    useEffect(() => {
        getAllPassages()
        .then((passages) => {
            const randomInt = Math.floor(Math.random() * passages.length)
            console.log(randomInt)
            setPlayPrompt(passages[randomInt])
            setPassage(passages[randomInt].excerpt.split(''))
        })
        .catch(console.error);
    }, []);

    return (
        <div className="Play">
            <h1>
                Typing Speed Test
            </h1>
            <div className="prompt">
                {passage.map((letter) => {
                    if (letter === ' '){
                        return (
                            <div>&nbsp;</div>
                        )
                    } else {
                        return (
                            <div>{letter}</div>
                        )
                    }
                })}
            </div>
            <div className="promptInfo">
                From {playPrompt.title} by {playPrompt.author}
            </div>
            <form className="testInput">
                <textarea 
                    id="testTextbox"
                    placeholder="Start Typing..."
                    rows="10"
                    cols="100">
                </textarea>
            </form>
        </div>
    )
};

export default Play;