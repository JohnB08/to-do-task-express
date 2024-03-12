import express from "express";
import cors from "cors";
import { initializeServer } from "./postgresFuncs/initializeServer/initializeServer.js";
import { verifyUserToken } from "./firebase/firebaseVerifier/firebaseVerifier.js";
import { fetchTodoItems, findUser, postNewUser, updateOrInsert } from "./postgresFuncs/usertodofuncs.js";
const server = express();
const port = 3000;
server.use(express.json());
server.use(cors());
const serverInitialization = await initializeServer();
console.log(serverInitialization);
server.get("/createNewUser", async (req, res) => {
    if (!req.headers.id_token) {
        return res.status(404).json({
            error: {
                message: "Missing ID token."
            }
        });
    }
    const token = req.headers.id_token;
    const verifiedToken = await verifyUserToken(token);
    if (!verifiedToken.success) {
        res.status(401).json({
            error: {
                message: "Unauthorized User."
            }
        });
    }
    const userID = verifiedToken.user;
    const createNewUser = await postNewUser(userID);
    if (!createNewUser.success) {
        console.log(createNewUser.error);
        return res.status(500).json({
            error: {
                message: "Internal Server Error. Please try again later."
            }
        });
    }
    return res.status(200).json({
        message: "User created successfully!"
    });
});
server.get("/todoItems", async (req, res) => {
    if (!req.headers.id_token) {
        return res.status(404).json({
            error: {
                message: "Missing ID token."
            }
        });
    }
    const token = req.headers.id_token;
    const verifiedToken = await verifyUserToken(token);
    if (!verifiedToken.success) {
        return res.status(401).json({
            error: {
                message: "Unauthorized User"
            }
        });
    }
    const user_id = await findUser(verifiedToken.user);
    if (!user_id.success) {
        console.log(user_id.error);
        return res.status(500).json({
            error: {
                message: "Internal Server Error, error finding user."
            }
        });
    }
    console.log(user_id.data);
    if (user_id.data?.rowCount === 0) {
        return res.status(404).json({
            error: {
                message: "Internal Server Error, missing internal userid"
            }
        });
    }
    const fetchedTodoItems = await fetchTodoItems(user_id.data?.rows[0].user_id);
    if (!fetchedTodoItems.success) {
        console.log(fetchedTodoItems.error);
        return res.status(500).json({
            error: {
                message: "Internal Server Error, error fetching items"
            }
        });
    }
    console.log(fetchedTodoItems);
    return res.status(200).json({
        data: {
            todoItems: fetchedTodoItems.todoItems
        }
    });
});
server.post("/todoItems", async (req, res) => {
    if (!req.headers.id_token) {
        return res.status(404).json({
            error: {
                message: "Missing ID token."
            }
        });
    }
    const token = req.headers.id_token;
    const verifiedToken = await verifyUserToken(token);
    if (!verifiedToken.success) {
        return res.status(401).json({
            error: {
                message: "Unauthorized User"
            }
        });
    }
    if (!req.body) {
        return res.status(404).json({
            error: {
                message: "Missing TodoList"
            }
        });
    }
    const user = verifiedToken.user;
    const todoArray = req.body;
    console.log(todoArray);
    const errorArray = [];
    for (let i = 0; i < todoArray.length; i++) {
        const data = await updateOrInsert(todoArray[i], user);
        if (!data.success) {
            errorArray.push(data.error);
        }
    }
    if (errorArray.length > 0) {
        console.log(errorArray);
        return res.status(500).json({
            error: {
                message: "Internal Server Error"
            }
        });
    }
    return res.status(200).json({
        success: {
            message: "Todolist Stored"
        }
    });
});
server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});
