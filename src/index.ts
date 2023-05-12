import express = require("express");
import cors = require("cors");
import { PORT } from "./config/constants";

// routes
import teamsRoutes from "./routes/teams";
import groupsRoutes from "./routes/groups";
import extraRoutes from "./routes/extra";
import matchsRoutes from "./routes/matchs";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/teams", teamsRoutes);
app.use("/api/groups", groupsRoutes);
app.use("/api/extra", extraRoutes);
app.use("/api/matchs", matchsRoutes);

app.listen(parseInt(PORT as string), () =>
  console.log(`Running on http://localhost:${PORT}`)
);
