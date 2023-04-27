import express, { Application } from "express";
import apiRoutes from "../routes/api";
import cors from "cors";
import requestFilterMiddleware from "../middlewares/requestFilter";

export class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.middlewares();
    this.routes();
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Server running on port ${this.port}`)
    );
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(requestFilterMiddleware);
  }

  routes() {
    this.app.use("/api", apiRoutes);
  }
}
