import React from 'react';
import '../../App.css';
import { deleteNote, toggleFav } from '../../store/actions/noteAction';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

function Note({ note }) {
    const dispatch = useDispatch();
    const deleteNoteHandler = (event) => {
        event.preventDefault(); 
        dispatch(deleteNote(note));
    }
    const toggleFavoriteHandler = (event) => {
        event.preventDefault(); 
        dispatch(toggleFav(note));
    }
    const editNoteHandler = () => {
        dispatch({ type: 'EDIT_NOTE', payload: note })
    }
    const heartMarkup = note.favorite ? 'favorite' : 'favorite_border';

    return (
        <div className="xl:w-1/3 md:w-1/2 p-4" bis_skin_checked="1">
            <Link to={`/note/${note.id}`}>
            <div className="flex border border-gray-200 p-6 rounded-lg justify-between" bis_skin_checked="1">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-indigo-500 mb-4" bis_skin_checked="1">
                <i className="material-icons" style={{cursor: 'pointer',color:'red'}} onClick={toggleFavoriteHandler}>{heartMarkup}</i>
                </div>
                <div className='m-2'>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">{note.constTitle}</h2>
                <p className="leading-relaxed text-base">{moment(note.createdAt.toDate()).fromNow()}</p>
                </div>
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-indigo-500 mb-4" bis_skin_checked="1">
                <i className="material-icons" style={{cursor: 'pointer'}} onClick={deleteNoteHandler}>delete</i>
                </div>
            </div>
        </Link>
        </div>
    )
}

export default Note;


