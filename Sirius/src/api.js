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
  return get(classesRef).then((snapshot) => {
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

export const getData = async (app, uid, key, ifnull) => {
  const db = getDatabase(app);
  const dataRef = ref(db, `data/${uid}/${key}`);
  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return ifnull;
    }
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

export const getRealData = async (app,  key, ifnull) => {
  const db = getDatabase(app);
  const dataRef = ref(db, `${key}`);
  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return ifnull;
    }
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
}

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


/*

Entire course data

[
   {
            name: "Introduction to AI",
            subjectPrefix: "CS"
            class: "fyug-sem-3" //This is grade
            id:"cs1",
            color:"bg-blue-600",
            modules: ["AI & Problem Solving"]
    }
]

*/ 

export const getCourses = (app)=>{
  const db = getDatabase(app);
  const classesRef = ref(db, "courses");
  return get(classesRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error("No data available");
    }
  })
}

/*
Learning Material structure in Firebase RTDB (/learn):
[
  {
    id: "serialized_name_unique", // e.g., ai_introduction_quiz
    name: "Introduction to AI Quiz",
    author: "user@example.com", // email of who generated it
    course: "cs1", // course id
    grade: "fyug-sem-3", // grade id
    tool_id: "normal_quiz", // identifier for the learning tool
    module_index: 0 // index of the module this material relates to
    content: { ...quiz_questions_json... } // Actual content stored here
  }
]
*/

export const getLearningMaterials = (app) => {
  const db = getDatabase(app);
  const materialsRef = ref(db, "learn");
  return get(materialsRef).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      if (Array.isArray(data)) {
        return data.filter(item => item !== null && item !== undefined); 
      } else if (typeof data === 'object' && data !== null) {
        // Firebase might return an object if array has numeric keys that are not contiguous
        // or if it was saved as an object initially.
        return Object.values(data).filter(item => item !== null && item !== undefined); 
      }
      return []; // Return empty array if data is null or not an array/object
    } else {
      return []; // No materials found
    }
  }).catch(error => {
    console.error("Error fetching learning materials:", error);
    throw error; // Re-throw to handle it in the calling component
  });
};

export const addLearningMaterialEntry = async (app, materialDataWithContent) => {
    const db = getDatabase(app);
    const materialsRef = ref(db, "learn");
    try {
        const snapshot = await get(materialsRef);
        let materialsArray = [];
        if (snapshot.exists()) {
            const data = snapshot.val();
            // Ensure we are working with an array
            if (Array.isArray(data)) {
                materialsArray = data.filter(item => item !== null && item !== undefined);
            } else if (typeof data === 'object' && data !== null) {
                 materialsArray = Object.values(data).filter(item => item !== null && item !== undefined);
            }
        }
        
        const existingIndex = materialsArray.findIndex(m => m.id === materialDataWithContent.id && m.course === materialDataWithContent.course && m.grade === materialDataWithContent.grade);
        
        if (existingIndex > -1) {
            materialsArray[existingIndex] = materialDataWithContent; // Update existing
        } else {
            materialsArray.push(materialDataWithContent); // Add new
        }
        
        await set(materialsRef, materialsArray); 
        console.log(`Learning material '${materialDataWithContent.name}' saved/updated successfully.`);
        return materialDataWithContent;
    } catch (error) {
        console.error("Error adding/updating learning material entry:", error);
        throw error;
    }
};


export const deleteLearningMaterial = async (app, materialId, userEmail) => {
    const db = getDatabase(app);
    const materialsRef = ref(db, "learn");
    try {
        const snapshot = await get(materialsRef);
        if (!snapshot.exists()) {
            console.log("No learning materials found to delete from.");
            return false;
        }

        let materialsArray = [];
        const data = snapshot.val();
        if (Array.isArray(data)) {
            materialsArray = data.filter(item => item !== null && item !== undefined);
        } else if (typeof data === 'object' && data !== null) {
            materialsArray = Object.values(data).filter(item => item !== null && item !== undefined);
        }


        const materialIndex = materialsArray.findIndex(m => m.id === materialId);

        if (materialIndex === -1) {
            console.log(`Material with ID ${materialId} not found.`);
            return false;
        }

        if (materialsArray[materialIndex].author !== userEmail) {
            console.log(`User ${userEmail} is not authorized to delete material ${materialId}.`);
            throw new Error("You are not authorized to delete this material.");
        }

        // Remove the material from the array
        materialsArray.splice(materialIndex, 1);

        // Update the database with the modified array
        await set(materialsRef, materialsArray);
        console.log(`Learning material ${materialId} deleted successfully.`);
        return true;
    } catch (error) {
        console.error("Error deleting learning material:", error);
        throw error;
    }
};

/* Notes */



/*  /dynotes
{
    id: 'cs1_fyug-sem-3'
    notes: [
      {
        name: "Introduction to AI"
        topics: [
          {
            name: "Introduction",
            content: [
              {
                name: "AI definition",
                text: "AI is the study of machine's ability to think all by itself",
                mathjax: null
              }
            ],
            questions:[{
              question: "What is AI ?"
              options: [
                "option a",
                "option b",
                "option c",
                "option d"
              ],
              currect: 0
              }
            ]
          }
        ]
      }
    ]

}
*/