// @ts-expect-error
import { Request, Response } from "npm:express@4.17.1";
import { RestauranteModel } from "../db/restaurante_schema.ts";

export const postRestaurante = async (req: Request, res: Response) => {

  const { name,CIF,address,bookings } = req.body;


 try {
  try {
      const contact = new RestauranteModel({
        name,
        CIF,
        address,
        bookings  
      });

      await contact.save();

      res.status(200).send({
        name,
        CIF,
        address,
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