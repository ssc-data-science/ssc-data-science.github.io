// Here we define api call functions

import { initializeApp } from "firebase/app"
import { firebaseConfig } from "./config"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, reauthenticateWithCredential, EmailAuthProvider, updatePassword, deleteUser } from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";

/* basic user structure 

{
  "users": {
    "user_id_1": {
      "name": "Ihjas",
      "username": "ihjas",
      "class": "FYUG - Sem 3",
      "department": "BSc. Physics",
      "profilePictureUrl": null, 
      "createdAt": "timestamp"
    },
  }
}

*/


/* basic class data structure 

{
  "classes":[
  {
      "id":"fyg-sem-3",
      "name":"FYUG - Sem 3",
      "departments":[
        {
          "id":"phy",
          "name":"BSc. Physics",
          "subjects":[
            {
              "id":"phy",
              "name":"Mechanics"
            },
            {
              "id":"cs1",
              "name":"Artificial Intelligence"
            },
            {
              "id":"stat",
              "name":"Statistics with R"
            }
          ]
        }
      ]
  }
}


*/


export const createUser = (app, username, password, userData) => {
  const auth = getAuth(app);
  const db = getDatabase(app);
  return createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userRef = ref(db, "users/" + user.uid);
      return set(userRef, {
        ...userData,
        uid: user.uid,
        createdAt: new Date().toISOString(),
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      throw error;
    });
}

export const getClasses = (app) => {
  const db = getDatabase(app);
  const classesRef = ref(db, "classes");
  return get(classesRef).then((snapshot) =>{
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error("No data available");
    }
  })
}

export const signIn = async (app, username, password) => {
  const auth = getAuth(app);
  const db = getDatabase(app);
  return signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userRef = ref(db, "users/" + user.uid);
      return get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            return snapshot.val();
          } else {
            throw new Error("No data available");
          }
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      throw error;
    });
}

export const changePassword = async (app, username, oldPassword, newPassword) => {
  const auth = getAuth(app);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, username, oldPassword);
    const user = userCredential.user;

    // Reauthenticate the user with their current credentials
    const credential = EmailAuthProvider.credential(username, oldPassword);
    await reauthenticateWithCredential(user, credential);

    // Update the password
    await updatePassword(user, newPassword)
    return true; // Indicate success
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    throw error;
  };

}

export const removeUser = (app,username,password)=>{
  const auth = getAuth(app);
  const db = getDatabase(app);
  return signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userRef = ref(db, "users/" + user.uid);
      return get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            return snapshot.val();
          } else {
            throw new Error("No data available");
          }
        }).then(()=>{
          return deleteUser(user)
        }).then(()=>{
          return set(userRef, null)
        })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      throw error;
    });

}

export const updateUserData = (uid, userData) => {
  const userRef = ref(db, "users/" + user.uid);
  return set(userRef, {
    ...userData,
    createdAt: new Date().toISOString(),
  });
}