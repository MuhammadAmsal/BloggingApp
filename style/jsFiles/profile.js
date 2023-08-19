let userName = document.querySelector("#userName");
// let userEmail = document.querySelector("#userEmail");
let dashBoardpp = document.querySelector("#dashBoardpp");
let profilePicture = document.querySelector("#profilePicture");
let editProfile = document.querySelector("#editProfile");
console.log(userName);

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  setDoc,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBMm8boJfpLYLWDjkcMUGMovJU8GukgA1E",
  authDomain: "blogging-app-627a5.firebaseapp.com",
  projectId: "blogging-app-627a5",
  storageBucket: "blogging-app-627a5.appspot.com",
  messagingSenderId: "919376477371",
  appId: "1:919376477371:web:b14c2bc99448405ee23d9e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// getdata
let currentLoggedInUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // console.log(uid)
    getUserData(uid);
    currentLoggedInUser = uid;
    // ...
  } else {
    // User is signed out
    // ...
    // console.log("sign out")
    window.location.href = "../login/login.html";
  }
});

async function getUserData(uid) {
  try {
    const docRef = doc(db, "user", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //   console.log("Document data:", docSnap.data());
      const { firstName,lastName,  profilePicture } = docSnap.data();
      userName.textContent = `${firstName}  ${lastName}`
    //   userEmail.textContent = Email;
      dashBoardpp.src =
        profilePicture  
      console.log(profilePicture);
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error);
  }
}

//edit data
editProfile.addEventListener('click', editProfileHandler)

async function editProfileHandler() {

      console.log(profilePicture.files[0], "edit button working properly")

    const file = profilePicture.files[0]

    // Create the file metadata
    /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' );
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log('File available at', downloadURL);
        
 
                try {
                    
                    const uid = auth.currentUser.uid
                    const imageRef = doc(db, "user", uid);
                    await updateDoc(imageRef, {
                        profilePicture: downloadURL 
                    })
                } catch (err) {
                    console.log(err.msg);
                }


            });
            alert(`Profile Update SuccessFuly`)
        }

    );
}
 
