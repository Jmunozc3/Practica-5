// @ts-expect-error
import { Request, Response } from "npm:express@4.17.1";
import { RestauranteModel } from "../db/restaurante_schema.ts";

export const deleteRestaurante = async (req: Request, res: Response) => {
  const { id_restaurante} = req.params;

  try {
    const datosres = await RestauranteModel.findOne({id:id_restaurante});

    const res = RestauranteModel.deleteOne({CIF: datosres.CIF});
    

   
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }

};