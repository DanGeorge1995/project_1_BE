import { handleNoParamFoundResponse } from "../../../errors/responses";

export const customValitateParam = (req, res, next) => {
  handleNoParamFoundResponse(res);
};
