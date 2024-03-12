import { fetchInitialTodos } from "../../assets/expressServerFetch/initialTodoFetch";
import { useEffect, useState } from "react";
import { SignOut } from "../SignOut/SignOut";
import { AddTodo } from "../AddTodo/AddTodo";
import { TodoObject, Response } from "../../assets/fetchedDataTypes/datatypes";
import { getAuth } from "firebase/auth";
import Style from "./ToDoHandler.module.css"
import { FormEvent } from "react";
import { DisplayTodos } from "../DisplayTodos/DisplayTodos";

const postResults = async (options: RequestInit) =>{
    const response = await fetch("http://localhost:3000/todoItems", options)
    const result = await response.json()
    return result
}


const verifyDataAsArray = (data:unknown): data is Array<TodoObject> =>{
    return (
        Array.isArray(data)
    )
}

export const ToDoHandler = () => {
    const [data, error] = fetchInitialTodos()
    const [todoArray, setTodoArray] = useState<TodoObject[]>([])
    useEffect(()=>{
        if (data){
            setTodoArray(verifyDataAsArray(data) ? data : [])
        }
    }, [data])
    const [response, setResponse] = useState<Response|null>(null)
    console.log(data, error)
    const makeNewTodo = async(event: FormEvent)=>{
        event.preventDefault();
        const target = event.target as typeof event.target & {
            todoItemInput: {value: string}
        }
        console.log(target)
        console.log(target.todoItemInput.value)
        const newTodoItem = target.todoItemInput.value
        const date = new Date().toISOString()
        const newTodoObject: TodoObject = {
            todoItem: newTodoItem,
            dateCreated: date,
            isComplete: false,
            isDeleted: false,
        }
        const newArray = [...todoArray, newTodoObject]
        console.log(newArray)
        setTodoArray(newArray)
        const auth = getAuth()
        const userId = await auth.currentUser?.getIdToken()
        const options: RequestInit = {
            method: "POST",
            headers: {
                id_token: userId as string,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newArray)
        }
        console.log(options)
        const result: Response = await postResults(options)
        console.log(result)
        setResponse(result)
    }
    return (
        <>
        <AddTodo handleSubmit={makeNewTodo}/>
        {response ? response.error? response.error.message : response.success.message : ""}
        <div className={Style.todoOutput}>
            {todoArray.map((element, index)=>{
                console.log(element)
                return <DisplayTodos todoObject={element} key={index}/>
                }
            )}
        </div>
        <SignOut className={[Style.SignOutBtn, "button"].join(" ")}/>
        </>
    )
}

