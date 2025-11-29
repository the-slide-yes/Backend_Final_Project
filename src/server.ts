import app from "./app";
import { Server } from "http";

// port number
const PORT: string | 3000 = process.env.PORT || 3000;

// start app server on port
const server: Server = app.listen(PORT, (): void => {
    console.log(`Server is running on port ${PORT}`);
});

export default server;