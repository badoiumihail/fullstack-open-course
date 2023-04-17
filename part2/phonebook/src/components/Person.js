import React from "react";

export default function Person({ name, phone, id, handleClick }) {
    return (
        <>
            <li>
                {name} {phone}
            </li>
            <button onClick={handleClick(id)} type="submit">
                Delete
            </button>
        </>
    );
}
