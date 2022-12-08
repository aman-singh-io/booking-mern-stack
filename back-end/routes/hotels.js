import express from "express";
import {
  countByType,
  createHotel,
  deleteHotel,
  getAllHotel,
  getHotel,
  getHotelRooms,
  updateHotel,
} from "../controllers/hotels.js";

const router = express.Router();

//COUNT BY TYPE
router.get("/countByType", countByType);

//CREATE
router.post("/", createHotel);

//UPDATE
router.put("/:id", updateHotel);

//DELETE
router.delete("/:id", deleteHotel);

//GET ALL
router.get("/", getAllHotel);

//GET
router.get("/:id", getHotel);

router.get("/room/:id", getHotelRooms);

export default router;
