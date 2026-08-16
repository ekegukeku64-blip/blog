import { initializeApp, type FirebaseApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  type Auth,
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
  type Firestore,
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

// 未配置 Firebase 环境变量时不初始化 SDK，保证模块可被页面安全导入，
// 普通博客页面构建与访问不受影响。
const app: FirebaseApp | null = isFirebaseConfigured ? initializeApp(firebaseConfig) : null
export const auth: Auth | null = app ? getAuth(app) : null
export const db: Firestore | null = app ? getFirestore(app) : null

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

export function loginWithGoogle() {
  if (!auth) return Promise.reject(new Error('Firebase 未配置，无法登录'))
  return signInWithPopup(auth, googleProvider)
}

export function loginWithGithub() {
  if (!auth) return Promise.reject(new Error('Firebase 未配置，无法登录'))
  return signInWithPopup(auth, githubProvider)
}

export function logout() {
  if (!auth) return Promise.reject(new Error('Firebase 未配置，无法退出登录'))
  return signOut(auth)
}

export function onAuth(callback: (user: User | null) => void) {
  if (!auth) {
    // 未配置时静默处理：不执行任何 Firebase 认证操作
    return () => {}
  }
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
