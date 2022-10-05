import { Router } from "express";
import { Routes } from "../utils/Constants";
import { ChatController } from "../controllers/Chat/index";

const router = Router();

router.get(Routes.CHAT, (req, res) => {
  return ChatController.findById(req, res);
});

router.get(Routes.CHATS, (req, res) => {
  return ChatController.findByOwner(req, res);
});

router.post(Routes.CHATS, (req, res) => {
  return ChatController.save(req, res);
});

export { router as ChatRouter };
