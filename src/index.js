import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance, getFirestore } from 'redux-firestore';
import firebase from 'firebase/app';
import fbConfig from './configs/fbConfig';
import { reduxFirestore } from 'redux-firestore';
import NoteDetail from './Components/notes/NoteDetail.js';


const store = createStore(rootReducer, compose(
  applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
  reduxFirestore(fbConfig)
  )
);
const rrfProps = {
  firebase,
  config: fbConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}
ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <React.StrictMode>
      <Router>
      <Switch>
        <Route exact path='/' component={App}></Route>
        <Route path='/note/:id' component={NoteDetail}></Route>
      </Switch>
    </Router>
      </React.StrictMode>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
