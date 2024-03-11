import express from "express";
import cors from "cors";
import { initializeServer } from "./postgresFuncs/initializeServer/initializeServer.js";
import { verifyUserToken } from "./firebase/firebaseVerifier/firebaseVerifier.js";
import { postNewUser } from "./postgresFuncs/usertodofuncs.js";
const server = express();
const port = 3000;
server.use(express.json());
server.use(cors());
const serverInitialization = await initializeServer();
console.log(serverInitialization);
server.get("/CreateNewUser", async (req, res) => {
    if (!req.headers.id_token) {
        return res.status(400).json({
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
    const userID = verifiedToken.userPayload?.uid;
    const createNewUser = await postNewUser(userID);
    if (!createNewUser.success) {
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
server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});
