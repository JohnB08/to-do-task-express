import { fetchInitialTodos } from "../../assets/expressServerFetch/initialTodoFetch";
import { SignOut } from "../SignOut/SignOut";
import Style from "./ToDoHandler.module.css"


export const ToDoHandler = () => {
    const [data, error] = fetchInitialTodos()
    return (
        <>
        <SignOut className={[Style.SignOutBtn, "button"].join(" ")}/>
        </>
    )
}

