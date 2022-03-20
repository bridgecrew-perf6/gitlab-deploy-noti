import { Router } from "express";
import { GitlabController } from "../../controllers/GitlabController";

const router = Router();

router.post('', GitlabController.handleHook);

export default router;