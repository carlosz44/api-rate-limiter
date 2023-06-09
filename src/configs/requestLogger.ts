import morgan, { StreamOptions } from "morgan";
import Logger from "./logger";

const stream: StreamOptions = {
  write: (message) => Logger.http(message),
};

const requestLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream }
);

export default requestLogger;
