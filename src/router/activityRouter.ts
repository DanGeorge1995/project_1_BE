import { Router } from "express";
import { handleInputErrors } from "../modules/middleware";
import { validateCreateActivity } from "../validations/activitiesValidations/createActivity";
import { createActivity } from "../handlers/activity";

const activityRouter = Router();

// GET

// POST
activityRouter.post("/create", validateCreateActivity(), handleInputErrors, createActivity);

//  PUT

// DELETE

export default activityRouter;
