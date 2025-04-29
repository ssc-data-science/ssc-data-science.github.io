// Here we define api call functions

import { initializeApp } from "firebase/app"
import { firebaseConfig } from "./config"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, reauthenticateWithCredential, EmailAuthProvider, updatePassword, deleteUser } from "firebase/auth";
import { get, getDatabase, ref, set, update } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

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
email: username, // Store email for reference
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

export const getUserDepartment = async (app, userdata) => {
const db = getDatabase(app);
const classes = await getClasses(app);
const userClass = userdata['class']
const userDepartmentId = userdata.department
console.log("userInfo retrieved")
const foundClass = classes.find(c => c.id === userClass);
if (foundClass) {
const foundDepartment = foundClass.departments.find(d => d.id === userDepartmentId);
if (foundDepartment) {
return foundDepartment;
}
}
return null;
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
const userData = snapshot.val();
// Ensure email is stored for password changes
if (!userData.email) {
  update(userRef, { email: username });
  userData.email = username;
}
return userData;
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

export const removeUser = (app, username, password) => {
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
}).then(() => {
return deleteUser(user)
}).then(() => {
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

// Function to update user profile data
export const updateUserProfile = async (app, uid, userData) => {
  const db = getDatabase(app);
  const userRef = ref(db, `users/${uid}`);
  
  // Create a new object with only the fields to update
  const updates = {
    name: userData.name,
    class: userData.class,
    department: userData.department,
    updatedAt: new Date().toISOString()
  };
  
  // Add profile picture URL if it exists
  if (userData.profilePictureUrl) {
    updates.profilePictureUrl = userData.profilePictureUrl;
  }
  
  return update(userRef, updates);
}

// Function to upload profile picture to Firebase Storage
export const uploadProfilePicture = async (app, uid, file) => {
  const storage = getStorage(app);
  
  // Create a unique file name using UID and timestamp
  const fileExtension = file.name.split('.').pop();
  const fileName = `profile_pictures/${uid}_${Date.now()}.${fileExtension}`;
  
  const profilePicRef = storageRef(storage, fileName);
  
  try {
    // Upload file to Firebase Storage
    await uploadBytes(profilePicRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(profilePicRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
}

export const getData = async (app, uid, key) => {
  const db = getDatabase(app);
  const dataRef = ref(db, `data/${uid}/${key}`);
  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

export const setData = async (app, uid, key, value) => {
  const db = getDatabase(app);
  const dataRef = ref(db, `data/${uid}/${key}`);
  try {
    await set(dataRef, value);
    return true;
  } catch (error) {
    console.error("Error setting data:", error);
    throw error;
  }
};
