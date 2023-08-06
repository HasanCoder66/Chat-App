// get elements into HTML

// // javaScript with firebase


const firstName = document.querySelector('#firstName ') 
// console.log(firstName)
const surName= document.querySelector('#surName') 
// console.log(surName)
const signupEmail= document.querySelector('#email-MobNum') 
// console.log(signupEmail)
const signupPassword = document.querySelector('#new-Password') 
// console.log(signupPassword)
const userMobNum = document.querySelector('#userMobNum') 
// console.log(userMobNum)

// Buttons login & signup
const signupBtn = document.querySelector('#signup-btn ') 
// console.log(signupBtn)
const loginBtn = document.querySelector('#loginBtn')
// console.log(loginBtn)
const loginEmailAddress = document.querySelector('#loginEmailAddress')
// console.log(loginEmailAddress)
const loginPassword = document.querySelector('#loginPassword')
// console.log(loginPassword)

const showPass = document.querySelector('#showPassword')
// console.log(showPassword)


// const overlay = document.querySelector('#staticBackdrop')
// console.log(overlay)

// const modal = document.querySelector('.modal-open')
// console.log(modal)


// Import the functions you need from the SDKs you need

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB8GHe2tvJoH0sk5zn35S-d565SqSrpl3o",
    authDomain: "social-media-app-with-fi-ac266.firebaseapp.com",
    projectId: "social-media-app-with-fi-ac266",
    storageBucket: "social-media-app-with-fi-ac266.appspot.com",
    messagingSenderId: "953607721783",
    appId: "1:953607721783:web:ca1008d42bebbb4f1340b2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// 1 add event listener onClick signUpHandler
signupBtn.addEventListener('click',signUpHandler)


// 2 add event listener onClick loginHandler
loginBtn.addEventListener('click',loginHandler)


// 3 add event listener onClick showPassword
showPass.addEventListener('click',showPassword)

function showPassword () {
  if (signupPassword.type ==='password') {
    signupPassword.type = 'text'
  }else {
    signupPassword.type = 'password'
  }
 
}

// // Function SignUp handler =====>>>
 function signUpHandler () {

createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
    if(user){
    addUserHandler(user.uid)
    emptyFields()
}

})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    // console.error(errorCode)
    // console.error(errorMessage)
  });
}

  function loginHandler() {
    // const auth = getAuth();
    signInWithEmailAndPassword(auth, loginEmailAddress.value, loginPassword.value)
    .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    if (user) {

      window.location.href = '../dashboard/dashboard.html'
    } 
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // console.error(error)
  });

  }

function emptyFields() {
         
  overlay.classList.toggle('show')

        firstName.value = "" 
        surName.value = "" 
        signupEmail.value = "" 
        signupPassword.value = "" 
        userMobNum.value = "" 
}

async function addUserHandler (uid) {

  try {
    const docRef = await setDoc(doc(db, "users", uid), {
      firstName: firstName.value,
      surName: surName.value ,
      signupEmail : signupEmail.value,
      userMobNum : userMobNum.value,
      
  
  
    });
  //   console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  }
  






















