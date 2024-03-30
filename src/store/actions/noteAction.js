export const addNote = (note) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('notes')
        .add({
            ...note,
            favorite: false,
            createdAt: new Date()
        })
        .then(() => {
            console.log("Note added successfully!");
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const deleteNote = (note) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('notes').doc(note.id).delete()
        .then(() => {
            console.log("Note deleted successfully!");
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const toggleFav = (note) => {
    return (dispatch, getState, { getFirestore }) => {
        const favStatus = !note.favorite;
        const firestore = getFirestore();
        firestore.collection('notes').doc(note.id).update({
            favorite: favStatus
        })
        .then(() => {
            console.log("toggle favorite successfully!");
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const updateNote = (note) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('notes').doc(note.id).update({
            title: note.title,
            content: note.content
        })
        .then(() => {
            console.log("Note updated successfully!");
        })
        .catch(err => {
            console.log(err);
        })
    }
}