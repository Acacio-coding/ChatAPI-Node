import { Router } from "express";
import { Routes } from "../utils/Constants";
import { MessageController } from "../controllers/Message/index";

const router = Router();

router.get(Routes.MESSAGE, (req, res) => {
  return MessageController.findById(req, res);
});

router.get(Routes.USER_MESSAGES, (req, res) => {
  return MessageController.findByUser(req, res);
});

router.get(Routes.GROUP_MESSAGES, (req, res) => {
  return MessageController.findByGroup(req, res);
});

router.post(Routes.MESSAGE, (req, res) => {
  return MessageController.save(req, res);
});

router.post(Routes.ONLY_SEND, (req, res) => {
  return MessageController.send(req, res);
});

router.put(Routes.MESSAGE, (req, res) => {
  return MessageController.setReceived(req, res);
});

export { router as MessageRouter };
