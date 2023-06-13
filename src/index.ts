import express = require("express");
import cors = require("cors");
import { PORT } from "./config/constants";

// routes
import teamsRoutes from "./routes/teams";
import groupsRoutes from "./routes/groups";
import extraRoutes from "./routes/extra";
import matchsRoutes from "./routes/matchs";
import playersRoutes from "./routes/players";
import authRoutes from "./routes/auth";
import stadiumsRoutes from "./routes/stadiums";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/teams", teamsRoutes);
app.use("/api/groups", groupsRoutes);
app.use("/api/extra", extraRoutes);
app.use("/api/matchs", matchsRoutes);
app.use("/api/players", playersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stadiums", stadiumsRoutes);

app.listen(parseInt(PORT as string), () =>
  console.log(`Running on http://localhost:${PORT}`)
);
