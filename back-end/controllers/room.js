import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res) => {
  const hotelId = req.params.hotelId;
  const roomId = req.params.roomId;
  try {
    await Room.findByIdAndDelete(req.params.id);
    await Hotel.findByIdAndUpdate(hotelId, {
      $pull: { rooms: roomId },
    });
    res.status(200).json("Room has been deleted.");
  } catch (error) {
    next(error);
  }
};

export const getAllRoom = async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.date,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};
