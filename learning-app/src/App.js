import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";

export default function App() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        console.log(`Inside the EFFECT hook`);
        axios.get("http://localhost:3001/notes").then((response) => {
            console.log(`Promise fulfilled successfully`);
            setNotes(response.data);
        });
    }, []);

    console.log("render", notes.length, "notes");

    return (
        <div>
            <h1>Notes</h1>
            {notes.map((note) => (
                <li key={note.id}>{note.content}</li>
            ))}
        </div>
    );
}
