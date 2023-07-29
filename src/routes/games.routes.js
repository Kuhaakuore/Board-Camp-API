import { Router } from "express";
import { validateGameSchema } from "../middlewares/validateGameSchema.js";
import { gameSchema } from "../schemas/game.schema.js";
import { createGame, getGames } from "../controllers/games.controller.js";

const gamesRouter = Router();

gamesRouter.post("/games", validateGameSchema(gameSchema), createGame);
gamesRouter.get("/games", getGames);
export default gamesRouter;