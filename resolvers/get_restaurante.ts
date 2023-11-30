// @ts-expect-error
import { Request, Response } from "npm:express@4.17.1";
import { RestauranteModel } from "../db/restaurante_schema.ts";

export const get_restaurante = async (req: Request, res: Response) => {
  try {

  const {CIF}= req.params;
  const rest =await RestauranteModel.findOne({CIF: CIF}).exec();  

    res.status(200).send(
        rest,
      );

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};