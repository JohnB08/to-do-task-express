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
