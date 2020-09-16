import { createStore } from 'redux'
import reducer from './reducer' // reducer.js wird mit "export DEFAULT" exportiert, dahier ist hier beim importieren keine geschweifte Klammerung nötig

const store = createStore(reducer) // ist ne Higher Order Funktion

export default store // Export wichtig um es in hauptapplikation verwenden zu können