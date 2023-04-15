import React from "react";

export const Header = (props) => {
    return <h1>{props.course.name}</h1>;
};

export const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercise}
        </p>
    );
};

export const Content = (props) => {
    let partComponentsList = [],
        id = 0;

    for (const part of props.course.parts) {
        partComponentsList.push(
            // key attribute due to https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
            <Part key={id} part={part.name} exercise={part.exercises} />
        );

        id++;
    }

    return <>{partComponentsList}</>;
};

export const Total = (props) => {
    let total = 0;

    for (const part of props.course.parts) {
        total += part.exercises;
    }

    return <p>Number of exercises {total}</p>;
};

const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
            },
            {
                name: "State of a component",
                exercises: 14,
            },
        ],
    };

    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    );
};

export default App;
