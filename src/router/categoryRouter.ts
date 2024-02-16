import { Router } from "express";
import { createCategory } from "../handlers/category";
import { validateCreateCategory } from "../validations/categoriesValidations/createCategory";
import { handleInputErrors } from "../modules/middleware";

const categoryRouter = Router();

categoryRouter.post("/create", validateCreateCategory(), handleInputErrors, createCategory);

export default categoryRouter;
