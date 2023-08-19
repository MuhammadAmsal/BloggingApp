import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {getAuth,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBMm8boJfpLYLWDjkcMUGMovJU8GukgA1E",
    authDomain: "blogging-app-627a5.firebaseapp.com",
    projectId: "blogging-app-627a5",
    storageBucket: "blogging-app-627a5.appspot.com",
    messagingSenderId: "919376477371",
    appId: "1:919376477371:web:b14c2bc99448405ee23d9e"
  };
  
   
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);


  let loginEmail = document.querySelector("#loginEmail");
  let loginPassword = document.querySelector("#loginPassword");
  let  loginBtn= document.querySelector("#loginBtn");

console.log(loginBtn)
console.log(loginPassword)
console.log(loginEmail)

  loginBtn.addEventListener('click', loginHandler)

function loginHandler() {
    if(!loginEmail.value || !loginPassword.value  ){
        alert(`Please Fill Out This Field`)
        return false
      }
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
        .then(  (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            if(user) {
                console.log(user)
                window.location.href = '/'
            }
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`User Does Not Exist`)
            // window.location.href = ''
        });
}
