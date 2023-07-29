import { Router } from "express";
import { validateRentalSchema } from "../middlewares/validateRentalSchema.js";
import { rentalSchema } from "../schemas/rental.schema.js";
import { concludeRental, createRental, deleteRental, getRentals } from "../controllers/rentals.controller.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateRentalSchema(rentalSchema), createRental);
rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals/:id/return", concludeRental);
rentalsRouter.delete("/rentals/:id", deleteRental);

export default rentalsRouter;