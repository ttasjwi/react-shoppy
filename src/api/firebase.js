// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";

import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {get, getDatabase, ref, set} from "firebase/database";
import {v4 as uuid} from 'uuid';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

const provider = new GoogleAuthProvider();

export const login = () => signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        return result.user;
    }).catch(console.error);

export const logout = () => signOut(auth);

/**
 * 사용자에게 Admin 권한이 있는 지 확인 후, 어드민 플래그를 삽입
 * @param user
 * @returns {Promise<void>}
 */
const addIsAdminFlag = async (user) => {
    return get(ref(database, 'admins'))
        .then(snapShot => {
            if (snapShot.exists()) {
                const admins = snapShot.val();
                const isAdmin = admins.includes(user.uid);
                return {...user, isAdmin};
            }
            return user;
        })
};


// 전역 인증 객체에 연결해서, 사용자 정보를 받아오고 callback에 user를 전달해서 실행
export const onUserStateChange = (callback) => {
    // 인증 상태가 변경될 때마다 전달받은 콜백을 실행하도록 함
    onAuthStateChanged(auth, async (user) => {
        // 사용자가 admin인지 여부를 판단하여, 사용자에 isAdminFlag를 추가함
        const updatedUser = user ? await addIsAdminFlag(user) : null;
        callback(updatedUser);
    })
};

export const registerNewProduct = async (product, image) => {
    const id = uuid();
    set(ref(database, `products/${id}`), {
        ...product,
        id,
        price: parseInt(product.price),
        image,
        options: product.options.split(',')
    })
};
