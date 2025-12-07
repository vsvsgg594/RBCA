import express from "express";
import { createServer } from "http";
import sequelize from "./database/sequilize";
import userRouter from "./routes/user-routes";
import { adminRoleMiddleware } from "./middleware/auth-middleware";
import { Server } from "socket.io";
import cors from "cors";
import { registerSocketHandlers } from "./soket";
import { setSocketInstance } from "./service/socket-service";

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, {
  cors: {
    origin: "*", 
  },
});
setSocketInstance(io);

registerSocketHandlers(io);

app.use("/api/user", userRouter);

app.use(
  "/profile",
  adminRoleMiddleware,
  (req, res) => {
    res.json({ message: "Your profile" });
  }
);

async function initializeFun() {
  try {
    await sequelize.authenticate();
    const connection = await sequelize.sync({ alter: true });
    if (connection) {
      console.log("database connection successfully");
    }
    server.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  } catch (err) {
    console.log(err);
  }
}

initializeFun();
