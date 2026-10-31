
// Inisialisasi bersama Firebase untuk SIP Persemaian

import {
    initializeApp,
    getApps,
    getApp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import {
    getAuth,
    setPersistence,
    browserSessionPersistence,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// KONFIGURASI FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyAt_r5DkU5GYfYQSz_tJ4RhxiGwb-TlTVQ",
    authDomain: "sip-persemaian-app.firebaseapp.com",
    projectId: "sip-persemaian-app",
    storageBucket: "sip-persemaian-app.appspot.com",
    messagingSenderId: "298884874547",
    appId: "1:298884874547:web:9ffbf2f56971b0ee8981246"
};

// INISIALISASI APLIKASI
const app = getApps().length
    ? getApp()
    : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// MENUNGGU FIREBASE MEMULIHKAN STATUS LOGIN
export const authReady = (async () => {
    await setPersistence(auth, browserSessionPersistence);

    return await new Promise((resolve, reject) => {
        let unsubscribe = null;

        unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                if (unsubscribe) unsubscribe();
                resolve(user);
            },
            (error) => {
                if (unsubscribe) unsubscribe();
                reject(error);
            }
        );
    });
})();

// FUNGSI LOGIN
export async function signIn(email, password) {
    await authReady;

    return signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
    );
}

// FUNGSI LOGOUT
export async function signOutUser() {
    await authReady;
    return signOut(auth);
}

// PEMERIKSAAN LOGIN UNTUK HALAMAN LAIN
export async function requireAuth() {
    await authReady;

    const user = auth.currentUser;

    if (!user) {
        window.location.replace("index.html");
        return false;
    }

    return true;
}

// EXPORT AUTH LISTENER
export { onAuthStateChanged };
