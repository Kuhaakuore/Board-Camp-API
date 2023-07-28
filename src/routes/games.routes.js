import { Router } from "express";
import { validateGamesSchemas } from "../middlewares/validateGamesSchemas.js";
import { gameSchema } from "../schemas/games.schema.js";
import { createGame, getGames } from "../controllers/games.controller.js";

const gamesRouter = Router();

gamesRouter.post("/games", validateGamesSchemas(gameSchema), createGame);
gamesRouter.get("/games", getGames);
export default gamesRouter;