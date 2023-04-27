import dotenv from "dotenv";
import { Server } from "./models/server";

// dotenv.config();
dotenv.config({ path: __dirname + "/.env" });

const server = new Server();
server.listen();
