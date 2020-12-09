import authReducer from './authReducer'
import activityReducer from './activityReducer'
import gearReducer from './gearReducer'
import accountReducer from './accountReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    activity: activityReducer,
    gear: gearReducer,
    account: accountReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer
