var firebaseConfig = {
    apiKey: "AIzaSyA6K2nMCSCdFScb-SE9sk5qLUK0s_l0rH0",
    authDomain: "fir-storage-tutorial-d72da.firebaseapp.com",
    databaseURL: "https://fir-storage-tutorial-d72da.firebaseio.com",
    projectId: "fir-storage-tutorial-d72da",
    storageBucket: "fir-storage-tutorial-d72da.appspot.com",
    messagingSenderId: "754461107499",
    appId: "1:754461107499:web:904d3cf1ca7d25b404916e",
    measurementId: "G-4D5V0V33GE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();


let profileView = document.getElementById('profile-view'),
    signUpView = document.getElementById('signup-view'),
    email = document.getElementById('email'),
    pword = document.getElementById('pword'),
    img = document.getElementById('img');

let file = {};

function chooseFile(e) {
    file = e.target.files[0];
}

function signUpButtonPressed() {
    firebase.auth().createUserWithEmailAndPassword(email.value, pword.value).then(auth => {

        firebase.storage().ref('users/' + auth.user.uid + '/profile.jpg').put(file).then(function () {
            console.log('successfully uploaded')
        }).catch(error => {
            console.log(error.message)
        })
    }).catch(error => {
        console.log(error.message);
    })
    
}

firebase.auth().onAuthStateChanged(user => {
    if(user){
        firebase.storage().ref('users/' + user.uid + '/profile.jpg').getDownloadURL().then(imgUrl => {
            img.src = imgUrl;
            signUpView.style.visibility = 'hidden';
            profileView.style.visibility = 'visible';
        })
    }
    else {
        signUpView.style.visibility = 'visible';
        profileView.style.visibility = 'hidden';
    }
})

function signOutButtonPressed(){
    firebase.auth().signOut()
}