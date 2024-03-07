import { createNewActivity, findDuplicateActivity, updateExistingActivity } from "../db/queries/activity";
import { handleDuplicateActivityResponse } from "../errors/responses";

export const createActivity = async (req, res, next) => {
  try {
    const userActivityDuplicate = await findDuplicateActivity(req);

    if (userActivityDuplicate.length > 0) {
      return handleDuplicateActivityResponse(res);
    }
    const activity = await createNewActivity(req);
    res.status(200).json({ message: "Success", activity });
  } catch (err) {
    next(err);
  }
};

export const updateActivity = async (req, res, next) => {
  try {
    console.log({ float: parseFloat(req.body.estimated_expenses) });
    const activity = await updateExistingActivity(req);
    res.status(200).json({ activity });
  } catch (err) {
    next(err);
  }
};
