import { db } from "../db/db.js";
export const postNewUser = async (username) => {
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
export const findUser = async (username) => {
    try {
        const data = await db.query(`
        SELECT user_id
        FROM Todousers
        WHERE username = '${username}'
        `);
        return { success: true, data };
    }
    catch (error) {
        return { success: false, error };
    }
};
export const fetchTodoId = async (userId) => {
    try {
        const data = await db.query(`
        SELECT todo_id
        FROM Todoitem_User_Relationship
        WHERE user_id = ${userId}
        `);
        return { success: true, data };
    }
    catch (error) {
        return { success: false, error };
    }
};
export const fetchTodoItems = async (userId) => {
    try {
        const data = await db.query(`
        SELECT * FROM fetchTodoItemsByUserId(${userId})
        `);
        const todoItems = data.rows.map(row => {
            if (!row.isDeleted) {
                return {
                    todoId: row.todo_id,
                    todoItem: row.todoitem,
                    dateCreated: row.datecreated,
                    isComplete: row.iscomplete,
                    isDeleted: row.isdeleted,
                };
            }
        });
        return {
            success: true, todoItems
        };
    }
    catch (error) {
        return { success: false, error };
    }
};
export const upDateTodoItem = async (todoObject) => {
    const { todoId, isComplete, isDeleted } = todoObject;
    try {
        const data = await db.query(`
        UPDATE TodoItems
        SET isComplete = $1, isDeleted = $2
        WHERE todo_id = $3
        `, [isComplete, isDeleted, todoId]);
        return { success: true, data };
    }
    catch (error) {
        return { success: false, error };
    }
};
export const insertTodoItem = async (todoObject, id) => {
    const { todoItem, dateCreated } = todoObject;
    try {
        const data = await db.query(`
        INSERT INTO Todoitems (todoItem, dateCreated)
        VALUES ($1, $2)
        RETURNING todo_id
        `, [todoItem, dateCreated]);
        const relData = await db.query(`
        INSERT INTO Todoitem_User_Relation(user_id, todo_id)
        VALUES (${id}, ${data.rows[0].todo_id})
        `);
        return { success: true, data, relData };
    }
    catch (error) {
        return { success: false, error };
    }
};
export const updateOrInsert = async (todoObject, user) => {
    const id = await findUser(user);
    return todoObject.todoId ? await upDateTodoItem(todoObject) : await insertTodoItem(todoObject, id.data?.rows[0].user_id);
};
export const updateUserTable = async (userId, todoId) => {
    try {
        const data = await db.query(`
        INSERT INTO Todoitem_User_Relation (user_id, todo_id)
        VALUES (${userId}, ${todoId})
        `);
        return { success: true, data };
    }
    catch (error) {
        return { success: false, error };
    }
};
