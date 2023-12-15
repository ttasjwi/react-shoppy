// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";

import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";

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

export const login = () => signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        return result.user;
    }).catch(console.error);

export const logout = () => signOut(auth);

// 전역 인증 객체에 연결해서, 사용자 정보를 받아오고 callback에 user를 전달해서 실행
export const onUserStateChange = (callback) => {
    // 인증 상태가 변경될 때마다 전달받은 콜백을 실행하도록 함
    onAuthStateChanged(auth, (user) => {
        callback(user);
    })
};
