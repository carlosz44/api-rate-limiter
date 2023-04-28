import express, { Application } from "express";
import cors from "cors";
import apiRoutes from "../routes/api";
import Logger from "./logger";
import requestLogger from "./requestLogger";
import rateLimiterMiddleware from "../middlewares/rateLimiter";
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
      Logger.debug(`Server running on port ${this.port}`)
    );
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(rateLimiterMiddleware);
    this.app.use(requestFilterMiddleware);
    this.app.use(requestLogger);
  }

  routes() {
    this.app.use("/api", apiRoutes);
  }
}
