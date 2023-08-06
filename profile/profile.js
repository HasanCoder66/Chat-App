import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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


const User_name = document.querySelector('.User_name')
// console.log(User_name)
const User_email = document.querySelector('.User_email')
// console.log(User_email)
const User_contact = document.querySelector('.User_contact')
// console.log(User_contact)
const User_description = document.querySelector('.User_description')
// console.log(User_description)



// const userDataBox = document.querySelector('#userDataBox')
// console.log(userDataBox)


onAuthStateChanged(auth, async (user) => {
    if (user) {

        const uid = user.uid;
        //   console.log(user)

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            const { firstName, surName, signupEmail, userMobNum } = docSnap.data()
            User_name.innerHTML = firstName + " " + surName
            User_email.innerHTML = signupEmail
            User_contact.innerHTML = userMobNum
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        // ...
    } else {
        window.location.href = '../index.html'
    }
});



// bekkar hogai koshish
// let div = document.createElement('div')
// div.setAttribute('card')

// div.innerHTML = `
// <div class="card-body">
//               <p id="profileBtn">
//                 <img
//                   src="https://scontent.fkhi4-3.fna.fbcdn.net/v/t39.30808-6/344859260_9764027536941505_5188833060278820647_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeH7vxBxRC8BIXXDfKxmKp_QIQqlHeM23VkhCqUd4zbdWUQP10T73idj9leNJ4HhuNE3NEJ2L2biQphwS3SpwqfO&_nc_ohc=Ev9NJMTiCH8AX9tS5LP&_nc_oc=AQm3HNrP-TdlBksGX79ATJtssRpdwujV4v09mFkqiz8fflH_efOIfbCadtWmLeq6I70&_nc_zt=23&_nc_ht=scontent.fkhi4-3.fna&oh=00_AfBVdO1b8Yk6YnFz6w6L08gRX270M3_UhUPeWLMuTQEWvg&oe=648F185F"
//                   width="50px" class="rounded-circle ">
               
                
//                 <strong class="User_name">${User_name} </strong>
//               </p>
//               <p>
//                 <strong class="User_email">${User_email} </strong>
//               </p>
//               <p>
//                 <strong class="User_contact">${User_contact} </strong>
//               </p>
//               <p>
//                 <strong class="User_description">User Description </strong>
//               </p>


//               <a href="#" class="btn btn-primary">View full profile</a>
//             </div>`

//             userDataBox.append(div)
