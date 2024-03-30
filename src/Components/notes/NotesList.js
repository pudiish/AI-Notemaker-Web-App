import React from 'react';
import Note from './Note';
import '../../App.css';

function NotesList({ notes }) {
    return (
        <div className="notesList">
            { notes && notes.map(note => <Note note={note} key={note.id} />) }
        </div>
    )
}

export default NotesList;
