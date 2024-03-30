import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateNote } from '../../store/actions/noteAction';
import useInput from '../../customhooks/useInput';
import { useHistory } from 'react-router-dom';

function EditForm() {
    const note = useSelector(state => state.note);
    const [title, bindTitle, resetTitle] = useInput(note.title);
    const [content, bindContent, resetContent] = useInput(note.content);
    const dispatch = useDispatch();
    const history = useHistory();
    const SubmitHandler = (e) => {
        e.preventDefault();
        dispatch(updateNote({ id: note.id, title, content }));
        resetTitle();
        resetContent();
        history.push('/');
    }
    return (
        <div className="section">
            <form onSubmit={SubmitHandler} className="white hoverable">
                <h4 className="gray-text center-align">Update Note</h4>
                <div className="input-field">
                    <input id="first_name" type="text" {...bindTitle}/>
                    <label className="active" htmlFor="first_name">Note Title</label>
                </div>
                <div className="input-field">
                    <textarea id="textarea1" className="materialize-textarea" {...bindContent} />
                    <label className="active" htmlFor="textarea1">Note Content</label>
                </div>
                <button className="btn green">Update</button>
            </form>
        </div>
    )
}

export default EditForm
