import { Router } from "express";
import { validateGamesSchemas } from "../middlewares/validateGamesSchemas.js";
import { gameSchema } from "../schemas/games.schema.js";
import { createGame } from "../controllers/games.controller.js";

const gamesRouter = Router();

gamesRouter.post("/games", validateGamesSchemas(gameSchema), createGame);

export default gamesRouter;