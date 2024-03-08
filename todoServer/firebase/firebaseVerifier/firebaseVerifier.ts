import firebase from "../firebaseConfig/firebaseConfig.js"

export const verifyUserToken = async(userToken: string) =>{
    try{
        const userPayload = await firebase.auth().verifyIdToken(userToken)
        return {success: true, userPayload}
    } catch (error){
        return {success: false, error}
    }
}