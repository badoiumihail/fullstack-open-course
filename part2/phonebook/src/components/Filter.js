import React from "react";

export default function Filter({ filter, handleInputFilter }) {
    return (
        <>
            <label htmlFor="filter">Filter:</label>
            <input
                type="text"
                name="filter"
                id="filter"
                value={filter}
                onChange={handleInputFilter}
            />
        </>
    );
}
