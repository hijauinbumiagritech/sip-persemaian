// Inisialisasi bersama Firebase untuk SIP Persemaian
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, setPersistence, browserSessionPersistence, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAt_r5DkU5GYfYQSz_tJ4RhxiGwb-TlTVQ",
  authDomain: "sip-persemaian-app.firebaseapp.com",
  projectId: "sip-persemaian-app",
  storageBucket: "sip-persemaian-app.appspot.com",
  messagingSenderId: "298884874547",
  appId: "1:298884874547:web:9ffbf2f56971b0ee8981246"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const authReady = setPersistence(auth, browserSessionPersistence);

export async function signIn(email, password) {
  await authReady;
  return signInWithEmailAndPassword(auth, email.trim(), password);
}

export async function signOutUser() {
  await authReady;
  return signOut(auth);
}

export async function requireAuth() {
  await authReady;
  const user = await new Promise((resolve) => {
    if (auth.currentUser) return resolve(auth.currentUser);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      unsubscribe();
      resolve(currentUser);
    });
  });
  if (!user) {
    window.location.replace("index.html");
    return false;
  }
  return true;
}

export { onAuthStateChanged };
