import { Router } from "express";
import { createCategory, updateCategory } from "../handlers/category";
import { validateCreateCategory } from "../validations/categoriesValidations/createCategory";
import { handleInputErrors } from "../modules/middleware";
import { validateUpdateCategory } from "../validations/categoriesValidations/updateCategory";
import { customValitateParam } from "../validations/categoriesValidations/custom";

const categoryRouter = Router();

categoryRouter.post("/create", validateCreateCategory(), handleInputErrors, createCategory);

categoryRouter.put("/update", customValitateParam);
categoryRouter.put("/update/:category_id", validateUpdateCategory(), handleInputErrors, updateCategory);

export default categoryRouter;
