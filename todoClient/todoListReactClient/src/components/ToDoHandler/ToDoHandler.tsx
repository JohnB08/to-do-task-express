import { SignOut } from "../SignOut/SignOut";
import Style from "./ToDoHandler.module.css"

export const ToDoHandler = () => {
    return (
        <SignOut className={[Style.SignOutBtn, "button"].join(" ")}/>
    )
}

