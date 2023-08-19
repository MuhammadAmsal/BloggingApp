 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword,} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {getFirestore,setDoc,doc,addDoc,collection,getDocs} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js"
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
const db = getFirestore(app);
const blogRef = collection(db, "blogs");

//get html elements

let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let repeatPassword = document.querySelector("#repeatPassword");
let signupBtn = document.querySelector("#signup");
// console.log(firstName)
// console.log(lastName)
// console.log(email)
// console.log(password)
// console.log(signupBtn)

 

signupBtn.addEventListener("click", signupHandler);

async function signupHandler(){
  if(!firstName.value || !lastName.value || !email.value || !password.value ||!repeatPassword.value ){
    alert(`Please Fill Out This Field`)
    return false
  }

  console.log(`hello`);
  console.log(email.value);
   try {
     const response = await createUserWithEmailAndPassword( auth, email.value, password.value);

    console.log(response, "==>>response");
    if (response.user) {
      addUserHandler(response.user.uid);
     }
   } catch (error) {
   alert(error);
  }
      }
      
      async function addUserHandler(uid) {
      console.log(uid)
        try {
      
          const response = await setDoc(doc(db, "user", uid), {
            firstName: firstName.value,
            lastName: lastName.value,
             Email: email.value,
            profilePicture:"https://firebasestorage.googleapis.com/v0/b/food-app-vanilla-javascript.appspot.com/o/ItemsImages%2Fperson-icon.png?alt=media&token=946bf31a-cc11-4256-b0a2-b2e11f9986ba",
            uid
          } );
        window.location.href = "./login.html";
        } catch (e) {
          console.error("Error adding document: ", e);
      
        }
      }
 