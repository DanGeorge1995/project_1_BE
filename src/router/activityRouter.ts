import { Router } from "express";
import { handleInputErrors } from "../modules/middleware";
import { validateCreateActivity } from "../validations/activitiesValidations/createActivity";
import { createActivity, updateActivity } from "../handlers/activity";
import { customValitateParam } from "../validations/activitiesValidations/custom";
import { validateUpdateActivity } from "../validations/activitiesValidations/updateActivity";

const activityRouter = Router();

// GET

// POST
activityRouter.post("/create", validateCreateActivity(), handleInputErrors, createActivity);

//  PUT
activityRouter.put("/update", customValitateParam);
activityRouter.put("/update/:activity_id", validateUpdateActivity(), handleInputErrors, updateActivity);

// DELETE

export default activityRouter;
