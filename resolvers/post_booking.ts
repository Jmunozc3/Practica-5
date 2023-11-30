// @ts-expect-error
import { Request, Response } from "npm:express@4.17.1";
import { BookingModel } from "../db/booking_schema.ts";

export const postBooking = async (req: Request, res: Response) => {


  const { id,date,client,bookings } = req.body;

 try {
  try {
      const contact = new BookingModel({
        id,
        date,
        client,
        bookings
      });

      await contact.save();

      res.status(200).send({
        id,
        date,
        client,
        bookings
      });

    } catch (error) {
      res.status(400).json({
        code: error.message,
        message: "Problem",
      });
      return;
    }
  } catch (error) {
    res.status(400).json({
      code: error.message,
      message: "Problem",
    });
    return;
  }
};