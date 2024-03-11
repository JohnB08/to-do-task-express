import { db } from "../db/db.js";
import { TodoObject } from "../types/todoObjectType.js";

export const postNewUser = async (username: string) => {
    try {
        const data = await db.query(`
        INSERT INTO Todousers ( username )
        VALUES ('${username}')
        RETURNING *
        `);
        return { success: true, data };
    }
    catch (error) {
        return { success: false, error };
    }
};


export const findUser=async(username: string)=>{
    try{
        const data = await db.query(`
        SELECT user_id
        FROM Todousers
        WHERE username = '${username}'
        `)
        return {success: true, data}
    } catch (error){
        return {success: false, error}
    }
}

export const fetchTodoId = async (userId:number) =>{
    try{
        const data = await db.query(`
        SELECT todo_id
        FROM Todoitem_User_Relationship
        WHERE user_id = ${userId}
        `)
        return {success: true, data}
    } catch (error){
        return {success: false, error}
    }
}

export const fetchTodoItems = async (userId: number) =>{
    try{
        const data = await db.query(`
        SELECT * FROM fetchTodoItemsByUserId(${userId})
        `)
        const todoItems = data.rows.map(row=>{
            return {
                todoItem: row.todoItem,
                dateCreaded: row.dateCreated,
                isComplete: row.isComplete,
                isDeleted: row.isDeleted,
            }
        })
        return {
            success: true, todoItems
        }
    } catch (error) {
        return {success: false, error}
    }
} 

export const insertTodoItem = async (todoObject: TodoObject) =>{
    const {todoItem, dateCreated} = todoObject
    try {
        const data = await db.query(`
        INSERT INTO Todoitems (todoItem, dateCreated)
        VALUES ('${todoItem}', ${dateCreated})
        RETURNING todo_id
        `)
        return {success: true, data}
    } catch (error){
        return {success: false, error}
    } 
}

export const updateUserTable = async (userId: number, todoId: number)=>{
    try{
        const data = await db.query(`
        INSERT INTO Todoitem_User_Relation (user_id, todo_id)
        VALUES (${userId}, ${todoId})
        `)
        return {success: true, data}
    } catch (error){
        return {success: false, error}
    }
}

