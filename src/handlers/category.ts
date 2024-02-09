import { createNewCategory, findDuplicateCategory } from "../db/queries/category";
import { handleDuplicateCategoryResponse } from "../errors/responses";

export const createCategory = async (req, res, next) => {
  try {
    const userCategoryDuplicate = await findDuplicateCategory(req);

    if (userCategoryDuplicate.length > 0) {
      return handleDuplicateCategoryResponse(res);
    }

    const newCategory = await createNewCategory(req);

    res.status(200).json({ newCategory });
  } catch (err) {
    next(err);
  }
};
