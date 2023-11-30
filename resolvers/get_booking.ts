// @ts-expect-error
import { Request, Response } from "npm:express@4.17.1";
import { BookingModel} from "../db/booking_schema.ts";
import { RestauranteModel } from "../db/restaurante_schema.ts";
import { ClientModel } from "../db/client_schema.ts";

export const get_booking = async (req: Request, res: Response) => {
  try {

  const {id}= req.params;
  
  const book =await BookingModel.findOne({id: id}).exec();

  const restaurante = await RestauranteModel.findOne({CIF: book.restaurant}).exec(); 

  const cliente = await ClientModel.findOne({DNI: book.client}).exec();

  res.status(200).send({
    booking: id,
    cliente: cliente?.firstName,
    restaurant: restaurante?.name
   }
  );

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};