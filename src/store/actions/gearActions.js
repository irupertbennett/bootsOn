export const addGear = (gear) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile
        const authorId = getState().firebase.auth.uid
        firestore.collection('gear').add({
            ...gear,
            dateCreated: new Date(),
            userFirstName: profile.firstName,
            userLastName: profile.lastName,
            createdBy: authorId
        }).then((docRef) => {
            dispatch({ type: 'ADD_GEAR', docRef})
        }).catch((error) => {
            dispatch({ type: 'ADD_GEAR_ERROR', error})
        })
    }
};

export const removeGear = (gear) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('gear').doc(gear).delete().then(() => {
            dispatch({ type: 'DELETE_GEAR', gear})
        }).catch((error) => {
            dispatch({ type: 'DELETE_GEAR_ERROR', error})
        })
    }
};

export const submitGear = (res) => {
    return (dispatch, getState, { getFirestore }) => {
        if(res.status === 200) {
             dispatch({ type: 'SUBMIT_GEAR', res})
        }
        else {
            dispatch({ type: 'SUBMIT_GEAR_ERROR', res})
        }
    }
};