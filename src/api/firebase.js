// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";

import {getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const provider = new GoogleAuthProvider();

export const login = async () => signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        console.log(user);
        return user;
    }).catch(console.error);


export const logout = async () => signOut(auth)
    .then(() => null)
    .catch(console.error);

// 전역 인증 객체에 연결해서, 사용자 정보를 받아오고 callback에 user를 전달해서 실행
export const onUserStateChange = (callback) => {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    })
};
