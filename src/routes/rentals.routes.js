import { Router } from "express";
import { validateRentalSchema } from "../middlewares/validateRentalSchema.js";
import { rentalSchema } from "../schemas/rental.schema.js";
import { concludeRental, createRental, getRentals } from "../controllers/rentals.controller.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateRentalSchema(rentalSchema), createRental);
rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals/:id/return", concludeRental);

export default rentalsRouter;