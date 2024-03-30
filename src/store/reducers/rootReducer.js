import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import noteReducer from './noteReducer';

// Add firebase to reducers
const rootReducer = combineReducers({
    note: noteReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer // <- needed if using firestore
});

export default rootReducer;