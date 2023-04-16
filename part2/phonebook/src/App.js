import { useState, createContext } from "react";
import { nanoid } from "nanoid";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";

export const MyContext = createContext();

export default function App() {
    const [persons, setPersons] = useState([
        { name: "Arthas Menethil", phone: "0726281267" },
    ]);
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [filter, setFilter] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (!newName || !newPhone) {
            alert(`Please fill out the ${newName ? "phone" : "name"}`);
            return;
        }

        let isNamePresent = persons.some((person) => person.name === newName);

        if (isNamePresent) {
            alert(`${newName} is already in the list!`);
            return;
        }

        setPersons(persons.concat({ name: newName, phone: newPhone }));
        setNewName("");
        setNewPhone("");
    }

    function handleInputName(event) {
        setNewName(event.target.value);
    }

    function handleInputPhone(event) {
        setNewPhone(event.target.value);
    }

    function handleInputFilter(event) {
        setFilter(event.target.value);
    }

    const filteredEntries = [];
    persons.forEach((person) => {
        if (person.name.toLowerCase().includes(filter.toLowerCase()))
            filteredEntries.push(
                <Person
                    key={nanoid()}
                    name={person.name}
                    phone={person.phone}
                />
            );
    });

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleInputFilter={handleInputFilter} />
            <h4>Add new entry:</h4>
            <MyContext.Provider
                value={{
                    newName,
                    newPhone,
                    handleInputName,
                    handleInputPhone,
                    handleSubmit,
                }}
            >
                <PersonForm />
            </MyContext.Provider>
            <h2>Numbers</h2>
            <ul>{filteredEntries}</ul>
        </div>
    );
}
