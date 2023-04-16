import React from "react";

export default function Button({ handleClick, title }) {
    return <button onClick={handleClick}>{title}</button>;
}
