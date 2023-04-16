import { useState } from "react";

function getMostPopularAnecdote(votes) {
    let maxVotes = 0;
    let mostPopular;

    for (const anecdote in votes) {
        if (votes[anecdote] >= maxVotes) {
            maxVotes = votes[anecdote];
            mostPopular = anecdote;
        }
    }

    return mostPopular;
}

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well.",
    ];

    const defaultVotes = {};

    for (let i = 0; i < anecdotes.length; i++) {
        defaultVotes[i] = 0;
    }

    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(defaultVotes);

    function handleClickAnecdote() {
        let randomIndex = Math.floor(Math.random() * 8);

        while (randomIndex === selected) {
            randomIndex = Math.floor(Math.random() * 8);
        }

        setSelected(randomIndex);
    }

    function handleClickVote() {
        const updateVotes = { ...votes };
        updateVotes[selected] += 1;
        setVotes(updateVotes);
    }

    return (
        <>
            <button onClick={handleClickAnecdote}>Random anecdote</button>
            <button onClick={handleClickVote}>Vote</button>
            <h3>Has {votes[selected]} votes</h3>
            <div>{anecdotes[selected]}</div>
            <h3>Most popular anecdote</h3>
            <div>{anecdotes[getMostPopularAnecdote(votes)]}</div>
        </>
    );
};

export default App;
