import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FS_APIKEY,
  authDomain: process.env.REACT_APP_FS_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FS_PROJECTID,
  databaseURL: process.env.REACT_APP_FS_DATABASEURL,
  storageBucket: process.env.REACT_APP_FS_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FS_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FS_APPID,
}

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig)

export default firebaseapp
