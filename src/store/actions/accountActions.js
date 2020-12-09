export const updateDetails = (details) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('users').doc(details.id).update({
            ...details
        }).then(() => {
            dispatch({ type: 'UPDATE_ACCOUNT', details})
        }).catch((error) => {
            dispatch({ type: 'UPDATE_ACCOUNT_ERROR', error})
        })
    }
};