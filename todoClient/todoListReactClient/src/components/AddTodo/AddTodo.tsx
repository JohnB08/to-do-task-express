
import { FormEventHandler } from "react"

type AddTodoProps = {
    handleSubmit: FormEventHandler
}




export const AddTodo = ({handleSubmit}: AddTodoProps) =>{
    return (
        <form  onSubmit={handleSubmit}>
            <label htmlFor="todoItemInput">
                Input new Todo:
                <input type="text" name="todoItemInput" id="todoItemInput"/>
            </label>
            <button type="submit">Add new todo</button>
        </form>
    )
}