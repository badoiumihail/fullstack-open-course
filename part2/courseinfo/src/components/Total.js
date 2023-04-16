import React from "react";

export default function Total({ parts }) {
    const total = parts.reduce((acc, curr) => acc + curr.exercises, 0);

    return (
        <p>
            Total number of exercises: <b>{total}</b>
        </p>
    );
}
