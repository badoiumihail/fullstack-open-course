import React from "react";
import { useContext } from "react";
import { MyContext } from "../App";

export default function PersonForm() {
    const {
        handleInputPhone,
        handleInputName,
        handleSubmit,
        newName,
        newPhone,
    } = useContext(MyContext);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={newName}
                    onChange={handleInputName}
                />
                <br />
                <label htmlFor="phone">Phone:</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={newPhone}
                    onChange={handleInputPhone}
                />
                <br />
                <button type="submit">add</button>
            </form>
        </>
    );
}
