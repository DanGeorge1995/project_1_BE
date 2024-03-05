import { Router } from "express";
import { createCategory, deleteCategory, getMultipleCategories, updateCategory } from "../handlers/category";
import { validateCreateCategory } from "../validations/categoriesValidations/createCategory";
import { handleInputErrors } from "../modules/middleware";
import { validateUpdateCategory } from "../validations/categoriesValidations/updateCategory";
import { customValitateParam } from "../validations/categoriesValidations/custom";
import { validateDeleteCategory } from "../validations/categoriesValidations/deleteCategory";
import { validateGetCategories } from "../validations/categoriesValidations/getCategories";

const categoryRouter = Router();

// GET
categoryRouter.get("/:user_id", validateGetCategories(), handleInputErrors, getMultipleCategories);

// POST
categoryRouter.post("/create", validateCreateCategory(), handleInputErrors, createCategory);

//  PUT
categoryRouter.put("/update", customValitateParam);
categoryRouter.put("/update/:category_id", validateUpdateCategory(), handleInputErrors, updateCategory);

// DELETE
categoryRouter.delete("/delete", customValitateParam);
categoryRouter.delete("/delete/:category_id", validateDeleteCategory(), handleInputErrors, deleteCategory);

export default categoryRouter;
