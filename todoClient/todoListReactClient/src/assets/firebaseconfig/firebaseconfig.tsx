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

export const firebaseAuthHandler = initializeApp(firebaseConfig)

export const userStatus = () =>{
    const [user, setUser] = useState<User | null>(null)
    const [userToken, setUserToken] = useState<string|null>(null)
    console.log(userToken)
    useEffect(()=>{
        const auth = getAuth(firebaseAuthHandler)
        console.log(auth)
        const userState = onAuthStateChanged(auth, async (user)=>{
            if (user){
                setUser(user)
                setUserToken(await auth.currentUser?.getIdToken() as string)
            } else {
                console.log("user is signed out")
                setUser(null)
                setUserToken(null)
            }
        })
        return userState
    }, [])
    return [user, userToken]
}