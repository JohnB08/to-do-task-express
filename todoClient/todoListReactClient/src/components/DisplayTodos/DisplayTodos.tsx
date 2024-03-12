
import { TodoObject } from "../../assets/fetchedDataTypes/datatypes";
import Style from "./DisplayTodos.module.css"


type DisplayTodoProps = {
    todoObject: TodoObject
    updateComplete: (event: React.MouseEvent<HTMLButtonElement>)=>void
    updateDeleted: (event: React.MouseEvent<HTMLButtonElement>)=>void
    objectIndex: number
}


export const DisplayTodos = ({todoObject, updateComplete, updateDeleted, objectIndex}:DisplayTodoProps) =>{
    const dateCreated = new Date(Date.parse(todoObject.dateCreated))
    console.log(todoObject.dateCreated)
    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    }

    const localDate = dateCreated.toLocaleString("en", dateOptions)
    return(
        <>
        {!todoObject.isDeleted ?
        <div className={Style.TodoItem}>
            <p className={Style.Date}>{localDate}</p>
            <p className={Style.Item}>{todoObject.todoItem}</p>
            {!todoObject.isComplete ? <button className={Style.Button} type="button" value={objectIndex} onClick={updateComplete}>Complete Todo</button> : <button className={Style.Button} type="button" disabled >Completed</button>}
            {!todoObject.isDeleted ? <button className={Style.Button} type="button" value={objectIndex} onClick={updateDeleted}>Delete Todo</button> : <button className={Style.Button} type="button" disabled >Deleted</button>}
        </div>: ""}
        </>
    )
}