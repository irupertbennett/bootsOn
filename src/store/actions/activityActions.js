export const createActivity = (activity) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile
        const authorId = getState().firebase.auth.uid
        firestore.collection('activities').add({
            ...activity,
            dateCreated: new Date(),
            userFirstName: profile.firstName,
            userLastName: profile.lastName,
            createdBy: authorId
        }).then(() => {
            dispatch({ type: 'CREATE_ACTIVITY', activity})
        }).catch((error) => {
            dispatch({ type: 'CREATE_ACTIVITY_ERROR', error})
        })
    }
};

export const removeLog = (log) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('activities').doc(log).delete().then(() => {
            dispatch({ type: 'DELETE_LOG', log})
        }).catch((error) => {
            dispatch({ type: 'DELETE_LOG_ERROR', error})
        })
    }
};

export const updateLog = (log) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('activities').doc(log.id).update({
            ...log
        }).then(() => {
            dispatch({ type: 'UPDATE_LOG', log})
        }).catch((error) => {
            dispatch({ type: 'UPDATE_LOG_ERROR', error})
        })
    }
};

export const addProduct = (product) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('products').doc(product.type).collection('items').add({
            ...product
        }).then(() => {
            dispatch({ type: 'ADD_PRODUCT', product})
        }).catch((error) => {
            dispatch({ type: 'ADD_PRODUCT_ERROR', error})
        })
    }
};
