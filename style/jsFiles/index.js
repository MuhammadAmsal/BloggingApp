import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {getAuth,signOut,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {getFirestore,collection,setDoc,addDoc,getDocs,getDoc,doc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
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

  let logoutBtn = document.querySelector("#logoutBtn");
  let postArea = document.querySelector("#postArea3");
//   console.log(logoutBtn)
const logoutHandler = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        // console.log("signout successfully")
        window.location.href = 'style/htmlfiles/login.html'
    }).catch((error) => {
        // An error happened.
    });
    
}
logoutBtn.addEventListener('click', logoutHandler)

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // console.log(uid)
        // getUserData(uid)
        currentLoggedInUser = uid
        // ...
    } else {
        // User is signed out
        // ...
        // console.log("sign out")
        window.location.href = 'style/htmlfiles/login.html'
    }
});

window.onload = function () {
    getBlogs()


}

const getBlogs = async () => {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    querySnapshot.forEach((doc) => {
        const uid = auth.currentUser.uid;
        console.log('uid====>', uid);
        const blogDoc = doc.data()
// console.log(blogDoc)
        const id = doc.id

        
            
             const cardcontent=`<div class="card1" > 
             
                 <div style="display: flex; flex-direction: row;" >
                     <div><img src=${blogDoc.profilePicture} alt="" width="100px" height="100px" ></div>
                 <div><h1>${blogDoc.title}</h1><p>${blogDoc.firstName}</p>
                 </div>
             </div>
             
             
                 <div><p  style="margin-left: 5px;">${blogDoc.description}</p></div>
            
             
             </div>
             `
             postArea.innerHTML += cardcontent
            return
    }
    )};

;

window.getBlogs = getBlogs
 






















// let currentLoggedInUser;

//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//             // User is signed in, see docs for a list of available properties
//             // https://firebase.google.com/docs/reference/js/auth.user
//             const uid = user.uid;
//             // console.log(uid)
//             // getUserData(uid)
//             currentLoggedInUser = uid
//             // ...
//         } else {
//             // User is signed out
//             // ...
//             // console.log("sign out")
//             window.location.href = '../login/login.html'
//         }
//     });
