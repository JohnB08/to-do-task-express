
import { TodoObject } from "../../assets/fetchedDataTypes/datatypes";
import Style from "./DisplayTodos.module.css"


type DisplayTodoProps = {
    todoObject: TodoObject
}


export const DisplayTodos = ({todoObject}:DisplayTodoProps) =>{
    const dateCreated = new Date(Date.parse(todoObject.dateCreated))
    console.log(todoObject.dateCreated)
    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    }
    const localDate = dateCreated.toLocaleString("en", dateOptions)
    const updateDeleted=()=>{
        todoObject.isDeleted=true
    }
    const updateComplete=()=>{
        todoObject.isComplete=true
    }
    return(
        <>
        <div className={Style.TodoItem}>
            <p>{localDate}</p>
            <p>{todoObject.todoItem}</p>
            {todoObject.isComplete ? <button className={Style.Button} type="button" onClick={updateComplete}>Complete Todo</button> : <button className={Style.Button} type="button" disabled >Completed</button>}
            {todoObject.isComplete ? <button className={Style.Button} type="button" onClick={updateDeleted}>Delete Todo</button> : <button className={Style.Button} type="button" disabled >Deleted</button>}
        </div>
        </>
    )
}