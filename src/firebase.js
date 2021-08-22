import firebase from "firebase";
/*writing the configuration */ 
const firebaseConfig = {
    apiKey: "AIzaSyALOKZzijeBEGP-zOdnDfs3gS1riZCHCXI",
    authDomain: "login-form-e7465.firebaseapp.com",
    projectId: "login-form-e7465",
    storageBucket: "login-form-e7465.appspot.com",
    messagingSenderId: "1036905900716",
    appId: "1:1036905900716:web:495c3010a01b2a6b0ccd09",
    measurementId: "G-84HLX74WYT"
  };
  /*To initialize our app */ 
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
/*Code to login to the page */
const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
/*using trycatch block along with async function*/    
try {
  const res = await auth.signInWithPopup(googleProvider);
  const user = res.user;
  const query = await db
    .collection("users")
    .where("uid", "==", user.uid)
    .get();
  if (query.docs.length === 0) {
    await db.collection("users").add({
      uid: user.uid,
      name: user.displayName,
      authProvider: "google",
      email: user.email,
    });
  }
} catch (err) {
  console.error(err);
  alert(err.message);
}
};
/*wirting the code to signing with email and password*/
const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
/*writing the code for registering a user with email and password*/
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
/*writing code to send a password reset link to an eamil address*/
const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}; 
/*wirting the code for logout function*/
const logout = () => {
  auth.signOut();
};
/*wiriting the code for export*/
export {
    auth,
    db,
    signInWithGoogle,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout,
  };