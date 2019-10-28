import firebase from 'firebase';

export const createUser = (email,password) => {
    console.log('Create user has been called');
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        console.log('createUser error: ',error)
        // ...
    });
}

export const signInUser = (email,password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
    } else {
        alert(errorMessage);
    }
    console.log(error);
    });
}

export const logoutUser = () => {
    firebase.auth().signOut();
}