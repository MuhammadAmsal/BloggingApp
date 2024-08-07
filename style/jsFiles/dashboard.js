import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getAuth,
   
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {
  getFirestore,
  
  doc,
  addDoc,
  collection,
  getDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
const firebaseConfig = .............../

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// let title = document.querySelector("#title");
// let description = document.querySelector("#description");
// let publishBtn = document.querySelector("#publishBtn")


const blogRef= collection(db,"blogs")

let title = document.querySelector("#title").value;
let description = document.querySelector("#description").value;
let publishBtn = document.querySelector("#publishBtn");
let postArea = document.querySelector("#postArea2");


const addBlog = async () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
//   console.log(`hello`);
  const uid = auth.currentUser.uid;

  const docRef = doc(db, "user", uid);
  const docSnap = await getDoc(docRef);






if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
const { firstName,lastName,  profilePicture } = docSnap.data();
  const obj = {title,description,firstName,lastName,profilePicture,uid};
  await addDoc(blogRef, obj);
  
} else {
//   docSnap.data() will be undefined in this case
  console.log("No such document!");
}
 
;}

window.addBlog = addBlog;




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

        if (blogDoc.uid === uid) {
            console.log('ok',blogDoc);

             const cardcontent=`<div class="card1" > 
             <!-- <div class="mainDiv" > -->
                 <div style="display: flex; flex-direction: row;" >
                     <div><img src=${blogDoc.profilePicture} alt="" width="100px" height="100px" ></div>
                 <div><h1>${blogDoc.title}</h1><p>${blogDoc.firstName}</p>
                 </div>
             </div>
             
             
                 <div><p  style="margin-left: 5px;">${blogDoc.description}</p></div>
             <!-- </div> -->
             
             </div>
             `
             postArea.innerHTML += cardcontent
            return
        }
    });

};

window.getBlogs = getBlogs
 
