import { Router } from "express";
import { Routes } from "../utils/Constants";
import { GroupController } from "../controllers/Group/index";

const router = Router();

router.get(Routes.GROUP, (req, res) => {
  return GroupController.findById(req, res);
});

router.get(Routes.USER_GROUPS, (req, res) => {
  return GroupController.findByUser(req, res);
});

router.post(Routes.GROUP, (req, res) => {
  return GroupController.save(req, res);
});

export { router as GroupRouter };
