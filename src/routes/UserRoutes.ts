import { Router } from "express";
import { Routes } from "../utils/Constants";
import { UserController } from "../controllers/User/index";

const router = Router();

router.get(Routes.USER, (req, res) => {
  return UserController.findByUsername(req, res);
});

router.get(Routes.ALL_USERS, (req, res) => {
  return UserController.getAll(req, res);
});

router.post(Routes.LOGIN, (req, res) => {
  return UserController.login(req, res);
});

router.post(Routes.USER, (req, res) => {
  return UserController.save(req, res);
});

router.put(Routes.USER, (req, res) => {
  return UserController.update(req, res);
});

export { router as UserRouter };
