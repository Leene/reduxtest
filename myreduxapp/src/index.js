import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { bugAdded } from './actions'

import store from './store' // keine geschwungenen Klammern da "export default"
//import * as actions from './actionTypes'

//const unsubscribe = // unsubscribe() ///->einblenden um unsubscribing zu simulieren

  store.subscribe(() => {
    console.log ("Store changed!", store.getState());
    
    })
    store.dispatch(bugAdded("Bug 1"))
     
    //////////
 /*   store.dispatch({
      type: actions.BUG_ADDED,
      payload: {
        description: "Bug1"
      }
    })*/
    
    // unsubscribe() ///->einblenden um unsubscribing zu simulieren, führt dazu da zweite Anderung im Store nicht mehr ausgefürt wir. Unsubscriben von Componenten ist wichtig wenn diese in der UI nicht merh sichtbar sind

    store.dispatch({
      type: actions.BUG_REMOVED,
      payload: {
        id: 1
      }
    })


console.log(store.getState()) // Ausgabe von aktuellen Statewerten des Stores


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
