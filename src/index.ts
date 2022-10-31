import socket from "socket.io";
import dotnev from "dotenv";
import logger from "./logger";

dotnev.config();
const port = +(process.env.PORT + '') || 8000;

class App {

    public io: socket.Server;

    constructor() {
        this.io = new socket.Server(port, {cors: { origin: '*'}});
        this.pipes();
    }

    private pipes(): void {
        logger.info(`Server is running at https://localhost:${port}`);
        this.io.on("connection", (socket) => {
            socket.on("message", (args) => {
                console.log(`MESSAGE: ${JSON.stringify(args)}`);
                this.io.emit('message-' + args.clientId + '-' + args.deviceId, args.body);
            });
        });
    }
}

export default new App().io;