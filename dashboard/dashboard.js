import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyB8GHe2tvJoH0sk5zn35S-d565SqSrpl3o",
    authDomain: "social-media-app-with-fi-ac266.firebaseapp.com",
    projectId: "social-media-app-with-fi-ac266",
    storageBucket: "social-media-app-with-fi-ac266.appspot.com",
    messagingSenderId: "953607721783",
    appId: "1:953607721783:web:3928cac0e1d0cd561340b2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();


const userName = document.querySelectorAll('.User_name')
// console.log(userName)
const postBtn = document.querySelector('.postBtn')
// console.log(postBtn)
const input_text = document.querySelector('#input-text')
// console.log(input_text)
const postArea = document.querySelector('#postArea')
// console.log(postArea)
const postImage = document.querySelector('#postAddImage')
// console.log(postImage.files)
let loggedInUserID;








onAuthStateChanged(auth, async (user) => {
    if (user) {

        const uid = user.uid;
        //   console.log(user)
        loggedInUserID = uid;
        // console.log(loggedInUserID)

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            const { firstName, surName } = docSnap.data()
            userName.innerHTML = `${firstName} ${surName}`
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        // ...
    } else {
        // window.location.href = '../index.html'
    }
});

const logoutBtn = document.querySelector('#logoutBtn')
// console.log(logoutBtn);
logoutBtn.addEventListener('click', logoutHandler)

function logoutHandler() {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });

}


function postHandler() {

    storePost();
    createPost();

}

async function storePost() {
    const currentTime = new Date()
    const file = postImage.files


    // Create the file metadata
    /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'postImages/' + file.name);
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
            getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                console.log('File available at', downloadURL);

                const docRef = await addDoc(collection(db, "posts"), {
                    postData: input_text.value,
                    author: loggedInUserID,
                    Time: currentTime,
                    imageUrl : getDownloadURL()
                });
                console.log("Document written with ID: ", docRef.id);
            
            })
        }
    );


    }


    
async function createPost() {

    postArea.innerHTML = ''

    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach(async (doc) => {
        const { postData, author, Time } = doc.data()

        const gettingUserData = await getAuthData(author)

        let div = document.createElement('div')
        div.setAttribute('class', "container shadow mt-3 p-3 mb-5 bg-body rounded")
        div.innerHTML = `<div class="row">
            <div class="col">
                <div class="full-box">
                    <h6 class="account-title-name  ">
                        <img src="https://scontent.fkhi4-3.fna.fbcdn.net/v/t39.30808-6/344859260_9764027536941505_5188833060278820647_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeH7vxBxRC8BIXXDfKxmKp_QIQqlHeM23VkhCqUd4zbdWUQP10T73idj9leNJ4HhuNE3NEJ2L2biQphwS3SpwqfO&_nc_ohc=Ev9NJMTiCH8AX9tS5LP&_nc_oc=AQm3HNrP-TdlBksGX79ATJtssRpdwujV4v09mFkqiz8fflH_efOIfbCadtWmLeq6I70&_nc_zt=23&_nc_ht=scontent.fkhi4-3.fna&oh=00_AfBVdO1b8Yk6YnFz6w6L08gRX270M3_UhUPeWLMuTQEWvg&oe=648F185F"
                            alt="" width="35px" class="rounded-circle">
                        <span class="user-name ps-2 "> <a href="../profile/profile.html"
                                class="text-dark User_name">${gettingUserData?.firstName}</a> </span> <br>
                    </h6>
                    <span class="time ps-5 fs-6 mb-0">${Time} <i
                            class="fa-solid fa-globe"></i></span>
                    <div class="description ps-2">
                        ${postData}
                    </div>
                    <div class="post">
                        <img src="../assets/assets/edit underwater.jpg " alt=""   > 
                    </div>
                    <div class="like-share d-flex justify-content-around align-items-center">
                        <div class="lik-box ">
                            <img src="../assets/assets/Edit like thumbsup.jpg" alt="" width="30px">
                            <span class="like-text"> <strong>Like</strong></span>
                        </div>
                        <div class="comment-box ">
                            <img src="../assets/assets/comment.png" alt="" width="40px">
                            <span> <strong>Comment</strong></span>
                        </div>
                        <div class="share-box">
                            <img src="../assets/assets/Share edit.jpg" alt="" width="55px">
                            <span> <strong>Share</strong></span>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        `
        postArea.prepend(div)
        input_text.value = " "
    })


}


async function getAuthData(id) {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        // console.log("No such document!");
    }
}



postBtn.addEventListener('click', postHandler);