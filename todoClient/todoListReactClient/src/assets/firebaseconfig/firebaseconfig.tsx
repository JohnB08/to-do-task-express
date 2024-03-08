import { initializeApp } from "firebase/app";
import {useEffect, useState} from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import.meta.env


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_FIREBASE_APPID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID
}
console.log(firebaseConfig)
export const firebaseAuthHandler = initializeApp(firebaseConfig)
console.log(firebaseAuthHandler)

export const userStatus = () =>{
    const [user, setUser] = useState<User | null>(null)
    useEffect(()=>{
        const auth = getAuth(firebaseAuthHandler)
        console.log(auth)
        const userState = onAuthStateChanged(auth, (user)=>{
            if (user){
                console.log("user is signed out")
                console.log(user)
                setUser(user)
            } else {
                console.log("user is signed out")
                setUser(null)
            }
        })
        return userState
    }, [])
    return [user]
}