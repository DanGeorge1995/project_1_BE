import { Router } from "express";
import { getUsers } from "./handlers/user";

const router = Router();

router.get("/users", getUsers);


export default router;
