import express from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verify.js";
import {
  updateUser,
  deleteUser,
  getAllUser,
  getUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/checkAuth", verifyToken, (req, res, next) => {
  res.send("Hello, you are logged in");
});

router.get("/checkUser/:id", verifyUser, (req, res, next) => {
  res.send("Hello, you are the user");
});

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET ALL
router.get("/", getAllUser);

//GET
router.get("/:id", verifyUser, getUser);

export default router;
