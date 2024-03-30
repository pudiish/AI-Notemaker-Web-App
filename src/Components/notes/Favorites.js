import React from 'react'
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import NotesList from './NotesList';

function Favorites() {
    
    useFirestoreConnect([{ collection: 'notes', where: ['favorite', '==', true], orderBy: ['createdAt', 'desc'],
    storeAs: 'favnotes'}]);
    const favNotes = useSelector(state => state.firestore.ordered.favnotes);
    console.log(favNotes);
    return (
        <NotesList notes={favNotes} />
    )
}

export default Favorites
