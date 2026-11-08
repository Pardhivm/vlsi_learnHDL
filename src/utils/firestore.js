
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

import { db } from "./firebase.js";

// Save or update the user's Google profile
export const saveUserProfile = async (user) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  await setDoc(
    userRef,
    {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      photoURL: user.photoURL || "",
      lastLoginAt: serverTimestamp()
    },
    { merge: true }
  );
};

// Save an EDA Playground project
export const savePlaygroundProject = async (
  uid,
  projectId,
  projectData
) => {
  if (!uid || !projectId) {
    throw new Error("User ID and project ID are required.");
  }

  const projectRef = doc(
    db,
    "users",
    uid,
    "projects",
    projectId
  );

  const existingProject = await getDoc(projectRef);

  await setDoc(
    projectRef,
    {
      ...projectData,
      createdAt: existingProject.exists()
        ? existingProject.data().createdAt
        : serverTimestamp(),
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );
};

// Retrieve all saved EDA projects
export const getPlaygroundProjects = async (uid) => {
  if (!uid) return [];

  const projectsRef = collection(
    db,
    "users",
    uid,
    "projects"
  );

  const projectsQuery = query(
    projectsRef,
    orderBy("updatedAt", "desc")
  );

  const snapshot = await getDocs(projectsQuery);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data()
  }));
};

// Delete a saved EDA project
export const deletePlaygroundProject = async (
  uid,
  projectId
) => {
  if (!uid || !projectId) return;

  await deleteDoc(
    doc(db, "users", uid, "projects", projectId)
  );
};

// Save the user's learning progress
export const saveLearningProgress = async (
  uid,
  courseId,
  progressData
) => {
  if (!uid || !courseId) return;

  const progressRef = doc(
    db,
    "users",
    uid,
    "progress",
    courseId
  );

  await setDoc(
    progressRef,
    {
      ...progressData,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );
};

// Retrieve the user's learning progress
export const getLearningProgress = async (uid) => {
  if (!uid) return [];

  const progressRef = collection(
    db,
    "users",
    uid,
    "progress"
  );

  const snapshot = await getDocs(progressRef);

  return snapshot.docs.map((item) => ({
    courseId: item.id,
    ...item.data()
  }));
};
