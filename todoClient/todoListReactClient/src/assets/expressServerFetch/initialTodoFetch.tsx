import {useState, useEffect} from "react"
import { TodoObject } from "../fetchedDataTypes/datatypes"
import { getAuth } from "firebase/auth"

export function fetchInitialTodos (){
    const [data, setData] = useState<TodoObject[]|null>(null)
    const [error, setError] = useState<unknown|null>(null)
    useEffect(()=>{
        const fetchInitial = async () =>{
            const auth = getAuth()
            const userId = await auth.currentUser?.getIdToken() as string
            const options:RequestInit = {
                method: "GET",
                headers: {
                    id_token: userId
                }
            }
            try{
                const response = await fetch("http://localhost:3000/todoItems", options)
                const result = await response.json()
                setData(result.data.todoItems)
            } catch (error){
                console.log(error)
                setError(error)
            }
        }
        fetchInitial()
    }, [])
    return [data, error]
}