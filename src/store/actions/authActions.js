export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            var user = firebase.auth().currentUser;
            user.reload();
            if(user.emailVerified){
                dispatch({type: 'LOGIN_SUCCESS'});
            }
            else{
                user.sendEmailVerification()
                dispatch({type: 'VERIFY_EMAIL'});
            }
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err});
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS'})
        });
    }
}

export const signUp = (newUser) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const accountType = 2;
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response) => {
            return firestore.collection('users').doc(response.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0],
                email: newUser.email,
                accountType: accountType,
                city: "",
                id: "",
                url: "",
                title: ""
            })
        }).then(() => {
            dispatch({type: 'SIGNUP_SUCCESS'})
        }).catch(error => {
            dispatch({type: 'SIGNUP_ERROR', error})
        })
    }
}

export const resetPassword = (emailAddress) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(emailAddress).then(function() {
            dispatch({type: 'RESET_EMAIL_SUCCESS'});
        }).catch(function(err) {
            dispatch({type: 'RESET_EMAIL_ERROR', err});
        });
    }
}