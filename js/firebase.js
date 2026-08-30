// Firebase configuration for the existing ROBOKRITI 2026 project.
// Firebase web API keys are client-side identifiers; protect data with Realtime Database Rules and Auth roles.
const firebaseConfig = {
  apiKey: "AIzaSyDW7Wi_8ea-Ph1TvIEpobXeIFUQQox_Yhg",
  authDomain: "robokriti-2026.firebaseapp.com",
  databaseURL: "https://robokriti-2026-default-rtdb.firebaseio.com",
  projectId: "robokriti-2026",
  storageBucket: "robokriti-2026.firebasestorage.app",
  messagingSenderId: "",
  appId: ""
};

let firebaseReady = false;
let db = null;
let auth = null;
if (window.firebase) {
  try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.database();
    auth = firebase.auth();
    firebaseReady = true;
  } catch (e) { console.error('Firebase init failed', e); }
}

window.RoboFirebase = { firebaseReady, db, auth };
window.RoboRole = {
  async get(uid) {
    if (!db || !uid) return null;
    const snap = await db.ref(`users/${uid}/role`).once('value');
    return snap.val() || null;
  }
};
