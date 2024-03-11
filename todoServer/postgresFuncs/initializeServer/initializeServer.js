import { db } from "../../db/db.js";
const createUserTable = async () => {
    try {
        const data = await db.query(`
        CREATE TABLE Todousers ( username VARCHAR(255) UNIQUE, user_id SERIAL PRIMARY KEY)
        `);
        return { success: true, data };
    }
    catch (error) {
        return { success: false, error };
    }
};
const createTodoLists = async () => {
    try {
        const data = await db.query(`
        CREATE TABLE TodoItems ( todo_id SERIAL PRIMARY KEY,  todoItem VARCHAR(255), isComplete BOOLEAN DEFAULT FALSE, isDeleted BOOLEAN DEFAULT FALSE, dateCreated DATE DEFAULT CURRENT_DATE)
        `);
        return { success: true, data };
    }
    catch (error) {
        return { success: false, error };
    }
};
const createUserListRelation = async () => {
    try {
        const data = await db.query(`
        CREATE TABLE Todoitem_User_Relation (
            todo_id INTEGER REFERENCES Todoitems(todo_id),
            user_id INTEGER REFERENCES Todousers(user_id),
            PRIMARY KEY (todo_id, user_id)
        )
        `);
        return { success: true, data };
    }
    catch (error) {
        return { success: false, error };
    }
};
const makeTodoFetchFunc = async () => {
    try {
        const data = await db.query(`
        CREATE OR REPLACE FUNCTION fetchTodoItemsByUserID(user_id_param INTEGER)
        RETURNS TABLE (todo_id INTEGER, todoitem VARCHAR(255), datecreated VARCHAR(255), iscomplete BOOLEAN, isdeleted BOOLEAN) AS $$
        BEGIN
        RETURN QUERY
            SELECT ti.todo_id, ti.todoitem, ti.datecreated, ti.iscomplete, ti.isdeleted
            FROM Todoitems ti
            JOIN Todoitem_User_Relation r ON ti.todo_id = r.todo_id
            WHERE r.user_id = user_id_param;
        END
        $$ LANGUAGE plpgsql
        `);
        return { success: true, data };
    }
    catch (error) {
        return { success: false, error };
    }
};
export const initializeServer = async () => {
    const userTable = await createUserTable();
    const todoListTable = await createTodoLists();
    const relationTable = await createUserListRelation();
    const relFunc = await makeTodoFetchFunc();
    return [userTable, todoListTable, relationTable, relFunc];
};
