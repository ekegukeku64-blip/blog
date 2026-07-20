import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  type User,
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  serverTimestamp,
  type Timestamp,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
}
export const isFirebaseConfigured = Object.values(firebaseConfig).every(
  value => typeof value === 'string' && value.trim().length > 0,
)

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

export function loginWithGoogle() {
  return signInWithPopup(auth, googleProvider)
}

export function loginWithGithub() {
  return signInWithPopup(auth, githubProvider)
}

export function logout() {
  return signOut(auth)
}

export function onAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}

export type Comment = {
  id?: string
  pageId: string
  uid: string
  displayName: string
  photoURL: string
  content: string
  status: 'approved' | 'pending' | 'rejected'
  createdAt: Timestamp | null
}

export type { User }

export {
  auth,
  db,
  serverTimestamp,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
}
