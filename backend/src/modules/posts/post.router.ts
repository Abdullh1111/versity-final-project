import { Router } from "express";
import * as postController from "./post.controller";
import { authorized } from "../../middleware/authorized";

const router = Router();

router.post("/",authorized, postController.create);
router.get("/",authorized, postController.getAll);
router.get("/:id",authorized, postController.getById);
router.put("/:id",authorized, postController.update);
router.delete("/:id",authorized, postController.remove);

export default router;
