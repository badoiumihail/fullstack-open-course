import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";

export const MyContext = createContext();

export default function App() {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [filter, setFilter] = useState("");

    // fetch initial data from db
    useEffect(() => {
        axios
            .get(`http://localhost:3001/persons`)
            .then((response) => setPersons(response.data))
            .catch((err) => console.log(err.message));
    }, []);

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

        setPersons(persons.concat({ name: newName, number: newPhone }));
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
                    phone={person.number}
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
