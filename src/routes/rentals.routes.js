import { Router } from "express";
import { validateRentalSchema } from "../middlewares/validateRentalSchema.js";
import { rentalSchema } from "../schemas/rental.schema.js";
import { createRental } from "../controllers/rentals.controller.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateRentalSchema(rentalSchema), createRental);

export default rentalsRouter;