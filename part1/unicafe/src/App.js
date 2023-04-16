import { useState } from "react";
import Header from "./Header";
import Statistics from "./Statistics";
import Button from "./Button";
import { useEffect } from "react";

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    //  not sure how to manage so many state variables yet
    const [total, setTotal] = useState(0);
    const [average, setAverage] = useState(0);
    const [positive, setPositive] = useState(0);

    function updateFeedback(feedback) {
        return () => {
            switch (feedback) {
                case "good":
                    setGood(good + 1);
                    break;
                case "neutral":
                    setNeutral(neutral + 1);
                    break;
                case "bad":
                    setBad(bad + 1);
                    break;

                default:
                    break;
            }

            setTotal(total + 1);
        };
    }

    // searched how to manage asynchronous state updates
    useEffect(() => {
        setAverage((good * 1 + neutral * 0 + bad * -1) / total);
        setPositive((good * 100) / total);
    }, [good, bad, neutral, total]);

    return (
        <>
            {/*
            initially i wanted to do 2 components and pass the
            Button component to one of them but didn't know how to pass
            the state variables down to the Button component besides
            using props, found something with React Context API but thought
            it's too early to use it
            */}
            <Header pageTitle={"Unicafe - feedback form"} />
            <Button handleClick={updateFeedback("good")} title={"Good"} />
            <Button handleClick={updateFeedback("neutral")} title={"Neutral"} />
            <Button handleClick={updateFeedback("bad")} title={"Bad"} />
            <Statistics
                title={"Statistics"}
                stats={{ good, neutral, bad, total, average, positive }}
            />
        </>
    );
};

export default App;
