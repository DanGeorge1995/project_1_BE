import { Router } from "express";
import { createCategory } from "../handlers/category";

const categoryRouter = Router();

categoryRouter.post("/create", createCategory);

export default categoryRouter;
