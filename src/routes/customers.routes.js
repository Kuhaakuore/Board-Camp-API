import { Router } from "express";
import { validateCustomerSchema } from "../middlewares/validateCustomerSchema.js";
import { customerSchema } from "../schemas/customer.schema.js";
import { createCustomer, editCustomerById, getCustomerById, getCustomers } from "../controllers/customers.controller.js";

const customersRouter = Router();

customersRouter.post("/customers", validateCustomerSchema(customerSchema), createCustomer);
customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerById);
customersRouter.put("/customers/:id", validateCustomerSchema(customerSchema), editCustomerById);

export default customersRouter;