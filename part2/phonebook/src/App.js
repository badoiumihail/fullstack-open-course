/* eslint-disable no-restricted-globals */
import { useState, useEffect, createContext } from "react";
import { nanoid } from "nanoid";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import personsService from "./services/personsService";

export const MyContext = createContext();

export default function App() {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        personsService
            .getAll()
            .then((response) => setPersons(response.data))
            .catch((err) => console.log(err.message));
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        if (!newName || !newPhone) {
            alert(`Please fill out the ${newName ? "phone" : "name"}`);
            return;
        }

        let personIndex = persons.findIndex(
            (person) => person.name === newName
        );

        if (personIndex !== -1) {
            const person = persons[personIndex];
            if (newPhone === person.number) {
                alert(
                    `${newName} with phone ${newPhone} is already in the list!`
                );
            } else {
                const result = confirm(
                    `${newName} is already added to the phonebook, replace the old number with a new one?`
                );
                if (result) {
                    const updatePhone = { ...person, number: newPhone };
                    const id = person.id;
                    personsService
                        .update(person.id, updatePhone)
                        .then((response) => {
                            setPersons(
                                persons.map((person) =>
                                    person.id === id ? response.data : person
                                )
                            );
                        })
                        .catch((err) => console.log(err.message));
                }
            }
            setNewName("");
            setNewPhone("");
            return;
        }

        const newPerson = { name: newName, number: newPhone };

        personsService
            .create(newPerson)
            .then((response) => {
                setPersons(persons.concat(response.data));
            })
            .catch((err) => console.log(err.message));

        setNewName("");
        setNewPhone("");
    }

    function handleClick(id) {
        return function deletePerson() {
            const updatePersonsState = persons.filter(
                (person) => person.id !== id
            );

            personsService
                .deleteOne(id)
                .then(() => {
                    setPersons(updatePersonsState);
                })
                .catch((err) => console.log(err.message));
        };
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
                    id={person.id}
                    name={person.name}
                    phone={person.number}
                    handleClick={handleClick}
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
