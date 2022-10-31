"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./logger"));
dotenv_1.default.config();
const port = +(process.env.PORT + '') || 8000;
class App {
    constructor() {
        this.io = new socket_io_1.default.Server(port, { cors: { origin: '*' } });
        this.pipes();
    }
    pipes() {
        logger_1.default.info(`Server is running at https://localhost:${port}`);
        this.io.on("connection", (socket) => {
            socket.on("message", (args) => {
                console.log(`MESSAGE: ${JSON.stringify(args)}`);
                this.io.emit('message-' + args.clientId + '-' + args.deviceId, args.body);
            });
        });
    }
}
exports.default = new App().io;
