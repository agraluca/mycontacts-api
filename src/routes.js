import { Router } from "express";
import ContactController from "./app/controllers/ContactController.js";
import CategoryController from "./app/controllers/CategoryController.js";

const routes = Router();
// Contacts
routes.get("/contacts", ContactController.index);
routes.get("/contacts/:id", ContactController.show);
routes.post("/contacts", ContactController.store);
routes.put("/contacts/:id", ContactController.update);
routes.delete("/contacts/:id", ContactController.delete);
// Categories
routes.get("/categories", CategoryController.index);
routes.get("/categories/:id", CategoryController.show);
routes.post("/categories", CategoryController.store);
routes.put("/categories/:id", CategoryController.update);
routes.delete("/categories/:id", CategoryController.delete);

export default routes;
