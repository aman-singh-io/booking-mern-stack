import express from "express";
import {
  createRoom,
  deleteRoom,
  updateRoomAvailability,
} from "../controllers/room.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, this is rooms endpoint");
});

router.post("/:hotelId", createRoom);

router.delete("/:hotelId/:roomId", deleteRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);

export default router;
