import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import moment from 'moment';

function NoteDetail(props) {
    const id = props.match.params.id;
    useFirestoreConnect([{ collection: 'notes', doc: id }]);
    const note = useSelector(({ firestore: { data } }) => data.notes && data.notes[id]);
    const noteMarkup = !isLoaded(note) ? (
        <div className="container section">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Loading</span>
                </div>
                <div className="card-action grey lighten-4 grey-text">

                </div>
            </div>
        </div>
    )
        : isEmpty(note) ? (
            <div className="container section">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">No matching note found. <b>OR</b> The note content is empty.</span>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">

                    </div>
                </div>
            </div>
        )
            : (
                <section class="text-gray-600 body-font overflow-hidden">
                    <div class="container px-5 py-24 mx-auto" bis_skin_checked="1">
                        <div class="lg:w-1/2 mx-auto flex flex-wrap" bis_skin_checked="1">
                            <div class="lg:pr-10 lg:py-6 mb-6 lg:mb-0" bis_skin_checked="1">
                                <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">{note?.title}</h1>
                                <div class="flex mb-4" bis_skin_checked="1">
                                    <a class="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">Description</a>
                                </div>
                                <p class="leading-relaxed mb-4 content" dangerouslySetInnerHTML={{ __html: note?.constContent }}></p>
                            </div>
                        </div>
                    </div>
                </section>
            )
    return noteMarkup;
}

export default NoteDetail
