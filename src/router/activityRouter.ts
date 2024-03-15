import { Router } from "express";
import { handleInputErrors } from "../modules/middleware";
import { validateCreateActivity } from "../validations/activitiesValidations/createActivity";
import { createActivity, deleteActivity, getMultipleActivities, updateActivity } from "../handlers/activity";
import { customValitateParam } from "../validations/activitiesValidations/custom";
import { validateUpdateActivity } from "../validations/activitiesValidations/updateActivity";
import { validateGetActivities } from "../validations/activitiesValidations/getActivities";
import { validateDeleteActivity } from "../validations/activitiesValidations/deleteActivity";

const activityRouter = Router();

// GET
activityRouter.get("/:user_id", validateGetActivities(), handleInputErrors, getMultipleActivities);

// POST
activityRouter.post("/create", validateCreateActivity(), handleInputErrors, createActivity);

//  PUT
activityRouter.put("/update", customValitateParam);
activityRouter.put("/update/:activity_id", validateUpdateActivity(), handleInputErrors, updateActivity);

// DELETE
activityRouter.delete("/delete", customValitateParam);
activityRouter.delete("/delete/:activity_id", validateDeleteActivity(), handleInputErrors, deleteActivity);

export default activityRouter;
