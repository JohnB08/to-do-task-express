import { signOut } from "firebase/auth";
import { firebaseAuthHandler } from "../../assets/firebaseconfig/firebaseconfig";
import { getAuth } from "firebase/auth";



  type SignOutProps = {
    className: string
  }


  export const SignOut = ({className}: SignOutProps) =>{
    const auth = getAuth(firebaseAuthHandler);
  

    
    const handleSignOut = async () =>{

    try {
      await signOut(auth);
    } catch (error){
      console.error("Sign out error!", error);
    }
  }
    return (
      <button onClick={handleSignOut} className={[className, "button"].join(" ")}>Sign Out</button>
    )
  }