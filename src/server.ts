import express from "express";
import cors from "cors";
import { Routes, PORT } from "./utils/Constants";
import { UserRouter } from "./routes/UserRoutes";
import { GroupRouter } from "./routes/GroupRoutes";
import { MessageRouter } from "./routes/MessageRoutes";
import { ChatRouter } from "./routes/ChatRoutes";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(Routes.BASE_API, UserRouter);
app.use(Routes.BASE_API, GroupRouter);
app.use(Routes.BASE_API, MessageRouter);
app.use(Routes.BASE_API, ChatRouter);

app.listen(PORT, () => {
  console.log(`Server started listening on http://localhost:${PORT}`);
});
