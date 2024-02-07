import express from "express";
import ViteExpress from "vite-express";
import { Sequelize, Op } from "sequelize";

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
ViteExpress.config({ printViteDevServerHost: true });

// Species ENDPOINTS
app.get("/api/getAllSpecies", async (req, res) => {
  try {
    const response = await Species.findAll();
    res.status(200).send(response);
  } catch (error) {
    console.error("Error retrieving goals:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/api/goal/:id", getGoal);
app.post("/api/goal", addGoal);
app.put("/api/goal/:id", updateGoalData);
app.delete("/api/goal/:id", deleteGoal);

// USER ENDPOINTS
app.get("/api/user/:id", getUser);
app.post("/api/user", addUser);

ViteExpress.listen(app, port, () => {
  console.log(`Server is listening http://localhost:${port}`);
});
