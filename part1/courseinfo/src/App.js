import React from "react";

export const Header = (props) => {
    return <h1>{props.course}</h1>;
};

export const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercise}
        </p>
    );
};

export const Content = (props) => {
    let partComponentsList = [];

    for (let i = 0; i < props.parts.length; i++) {
        partComponentsList.push(
            <Part part={props.parts[i]} exercise={props.exercises[i]} />
        );
    }

    return <>{partComponentsList}</>;
};

export const Total = (props) => {
    return <p>Number of exercises {props.total}</p>;
};

const App = () => {
    const course = "Half Stack application development";
    const part1 = "Fundamentals of React";
    const exercises1 = 10;
    const part2 = "Using props to pass data";
    const exercises2 = 7;
    const part3 = "State of a component";
    const exercises3 = 14;

    return (
        <div>
            <Header course={course} />
            <Content
                parts={[part1, part2, part3]}
                exercises={[exercises1, exercises2, exercises3]}
            />
            <Total total={exercises1 + exercises2 + exercises3} />
        </div>
    );
};

export default App;
