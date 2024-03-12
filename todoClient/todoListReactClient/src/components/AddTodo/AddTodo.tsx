
import { FormEventHandler } from "react"
import Style from "./AddTodo.module.css"

type AddTodoProps = {
    handleSubmit: FormEventHandler
}




export const AddTodo = ({handleSubmit}: AddTodoProps) =>{
    return (
        <form onSubmit={handleSubmit} className={Style.form}>
            <label htmlFor="todoItemInput" className={Style.Label}>
                Input new Todo:
            </label>
            <input type="text" name="todoItemInput" id="todoItemInput" className={Style.Input}/>
            <button type="submit" className={Style.Button}>Add new todo</button>
        </form>
    )
}