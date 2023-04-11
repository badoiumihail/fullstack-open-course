import React from "react";

function Hello(props) {
    console.log(props);
    return (
        <div>
            <p>
                Hello {props.name}, you are {props.age} years old.
            </p>
        </div>
    );
}

function App() {
    const age = 27;
    const name = "Jim";
    const random = [1, 2, 3, 4, 5];
    return (
        // this is a fragment root element, to avoid
        // cluttering the DOM with useless div elements
        // like the component above
        <>
            <h1>Greetings</h1>
            {/*
                even though REACT can render only primitives, if you try to render an array
                that has primitives as elements, it will work
             */}
            <p>{random}</p>
            {/* that's how you pass data to components, through props */}
            <Hello name="Dwight" age={Math.random() * 100} />
            <Hello name={name} age={age} />
        </>
    );
}

export default App;
