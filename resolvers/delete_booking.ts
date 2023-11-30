// @ts-expect-error
import { Request, Response } from "npm:express@4.17.1";
import { BookingModel } from "../db/booking_schema.ts";

export const deleteBooking = async (req: Request, res: Response) => {
  const { id_book} = req.params;

  try {
    const datosbook = await BookingModel.findOne({id:id_book});

    const Concesionary = await BookingModel.deleteOne({id:datosbook?.id});
    

    
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }

};