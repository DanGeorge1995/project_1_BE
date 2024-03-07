import { createNewActivity, findDuplicateActivity } from "../db/queries/activity";
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
