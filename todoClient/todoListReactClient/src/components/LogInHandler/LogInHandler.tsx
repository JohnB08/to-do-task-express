import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {FormEvent, useState} from "react";
import { firebaseAuthHandler, userStatus } from "../../assets/firebaseconfig/firebaseconfig";
import Style from "./LoginHandler.module.css"
import { SignOut } from "../SignOut/SignOut"
import { FirebaseError } from "firebase/app";
import { useFetchApi, mainUrl } from "../../assets/expressServerFetch/fetchToServer";


export default function LoginPage() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string|null>(null);
  const [authStyle, setAuthStyle] = useState<string>("");
  const auth = getAuth(firebaseAuthHandler);
  const [showLogin, setShowLogin] = useState<boolean>(true);  
  const [user, userToken] = userStatus()
  console.log(user, userToken)

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error){
      if (error instanceof FirebaseError){
        console.log(error.code)
        switch (error.code){
          case "auth/user-not-found":
            setAuthError("User not found");
            setAuthStyle(Style.Error);
            break;
          case "auth/invalid-credential":
            setAuthError("Invalid email or password");
            setAuthStyle(Style.Error);
            break;
          case "auth/missing-password":
            setAuthError("Password is missing");
            setAuthStyle(Style.Error);
            break;
          default:
            setAuthError("Something went wrong");
            setAuthStyle(Style.Error);
            break;
        }
    } else {
      console.log("Login Error!", error);
      setAuthError("Something went wrong");
      setAuthStyle(Style.Error);
    }
  }
}

  const handleSignup = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      authError ? setAuthError(null) : null;
      authStyle ? setAuthStyle("") : null;
    } catch (error){
      if (error instanceof FirebaseError){
        console.log(error.code)
        switch (error.code){
          case "auth/email-already-in-use":
            setAuthError("Email already in use");
            setAuthStyle(Style.Error);
            break;
          case "auth/invalid-email":
            setAuthError("Invalid email");
            setAuthStyle(Style.Error);
            break;
          case "auth/missing-password":
            setAuthError("Password is missing");
            setAuthStyle(Style.Error);
            break;
          case "auth/weak-password":
            setAuthError("Weak password");
            setAuthStyle(Style.Error);
            break;
          default:
            setAuthError("Something went wrong");
            setAuthStyle(Style.Error);
            break;
        }
    } else {
      console.log("Login Error!", error);
      setAuthError("Something went wrong");
      setAuthStyle(Style.Error);
    }
  
  } finally {
    const idToken = await auth.currentUser?.getIdToken() as string
    const newOptions: RequestInit = {
      method: "GET",
      headers: {
        id_token: idToken
      }
    }
    console.log(newOptions)
    const newUrl = `${mainUrl}createNewUser`
    console.log(newUrl)
    const setNewUser = await useFetchApi(newUrl, newOptions)
    if (!setNewUser.success){
      console.log(setNewUser.error)
    }
    else {
      console.log(setNewUser.result)
    }
  }
}
  const toggleForm = () =>{
    setShowLogin(!showLogin)
  }


  


  return (
    <div className={Style.MainContainer}>
      <h1>ToDoifier</h1>
      {user ? <SignOut className=""/> : showLogin ? 
      <>
      <h3>Please Log In to continue</h3>
      <form onSubmit={handleLogin} className={[Style.mainForm, "login"].join(" ")}>
        <div className={[Style.EmailInput, authStyle].join(" ")}>
          <label htmlFor="email">{authError ? authError : "Email: "}</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={Style.PasswordInput}>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className={Style.ButtonContainer}>
        <button type="submit" className={[Style.SubmitBtn, "button"].join(" ")}>Log in</button>
      </div>
      </form>
        <button onClick={toggleForm} className={[Style.ToggleBtn, "button"].join(" ")}>New User? Sign Up</button>
      </>
      :
      <>
        <h3>Please Sign up to continue</h3>
        <form onSubmit={handleSignup} className={[Style.mainForm, "signup"].join(" ")}>
        <div className={[Style.EmailInput, authStyle].join(" ")}>
          <label htmlFor="email">{authError ? authError : "Email: "}</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={Style.PasswordInput}>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className={Style.ButtonContainer}>
        <button type="submit" className={[Style.SubmitBtn, "button"].join(" ")}>Sign up!</button>
      </div>
      </form>
        <button onClick={toggleForm} className={[Style.ToggleBtn, "button"].join(" ")}>Back to log In</button>
      </>
      }

    </div>
  );
}