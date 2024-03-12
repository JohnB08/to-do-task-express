import { firebaseApp } from "../../postgresFuncs/initializeServer/initializeServer.js"

export const verifyUserToken = async(userToken: string) =>{
    try{
        const userPayload = await firebaseApp.auth().verifyIdToken(userToken)
        return {success: true, user: userPayload.uid}
    } catch (error){
        return {success: false, error}
    }
}