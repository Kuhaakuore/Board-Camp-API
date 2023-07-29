import { Router } from "express";
import { validateCustomerSchema } from "../middlewares/validateCustomerSchema.js";
import { customerSchema } from "../schemas/customer.schema.js";
import { createCustomer, getCustomers } from "../controllers/customers.controller.js";

const customersRouter = Router();

customersRouter.post("/customers", validateCustomerSchema(customerSchema), createCustomer);
customersRouter.get("/customers", getCustomers);

export default customersRouter;