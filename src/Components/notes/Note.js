import React from 'react';
import '../../App.css';
import { deleteNote, toggleFav } from '../../store/actions/noteAction';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

function Note({ note }) {
    const dispatch = useDispatch();
    const deleteNoteHandler = () => {
        dispatch(deleteNote(note));
    }
    const toggleFavoriteHandler = () => {
        dispatch(toggleFav(note));
    }
    const editNoteHandler = () => {
        dispatch({type: 'EDIT_NOTE', payload: note})
    }
    const heartMarkup = note.favorite ? 'favorite' : 'favorite_border';

    return (
        <div className="note white hoverable center-align" style={{borderRadius: '5px'}}>
            <div className="right-align">
                <i className="material-icons red-text" style={{cursor: 'pointer'}} onClick={toggleFavoriteHandler}>{heartMarkup}</i>
                <i className="material-icons" style={{cursor: 'pointer'}} onClick={deleteNoteHandler}>delete</i>
            </div>
            <Link to={`/note/${note.id}`}>
                <h5 className="black-text">{note.title}</h5>
            </Link>
            <h5 className="truncate">{note.content}</h5>
            <h5 className="grey-text">{moment(note.createdAt.toDate()).fromNow()}</h5>
            <div className="right-align">
            <Link to={`/editform/${note.id}`}>
                <i className="material-icons black-text" style={{cursor: 'pointer'}} onClick={editNoteHandler}>edit</i>
            </Link>
            </div>
        </div>
    )
}

export default Note;
