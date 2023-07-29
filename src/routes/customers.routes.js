import { Router } from "express";
import { validateCustomerSchema } from "../middlewares/validateCustomerSchema.js";
import { customerSchema } from "../schemas/customer.schema.js";
import { createCustomer, getCustomerById, getCustomers } from "../controllers/customers.controller.js";

const customersRouter = Router();

customersRouter.post("/customers", validateCustomerSchema(customerSchema), createCustomer);
customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerById);

export default customersRouter;