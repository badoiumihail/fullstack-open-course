import { useState, useEffect } from "react";
import noteService from "./services/notes";
import Note from "./components/Note";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        noteService
            .getAll()
            .then((response) => {
                setNotes(response.data);
            })
            .catch((err) => console.log(err.message));
    }, []);

    const toggleImportanceOf = (id) => {
        const note = notes.find((n) => n.id === id);
        const changedNote = { ...note, important: !note.important };

        noteService
            .update(id, changedNote)
            .then((response) => {
                setNotes(notes.map((n) => (n.id !== id ? n : response.data)));
            })
            .catch((err) => console.log(err.message));
    };

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            important: Math.random() > 0.5,
        };

        noteService
            .create(noteObject)
            .then((response) => {
                setNotes(notes.concat(response.data));
                setNewNote("");
            })
            .catch((err) => console.log(err.message));
    };

    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    };

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important);

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? "important" : "all"}
                </button>
            </div>
            <ul>
                <ul>
                    {notesToShow.map((note) => (
                        <Note
                            key={note.id}
                            note={note}
                            toggleImportance={() => toggleImportanceOf(note.id)}
                        />
                    ))}
                </ul>
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
        </div>
    );
};

export default App;
