// @ts-expect-error
import { Request, Response } from "npm:express@4.17.1";
import { RestauranteModel } from "../db/restaurante_schema.ts";

export const delete_all_Restaurante = async (req: Request, res: Response) => {
 

  try {
    
    const Restaurante = await RestauranteModel.find();
    
    Restaurante.forEach(function(Restaurant){
       RestauranteModel.deleteOne({CIF: Restaurant.CIF});
    });
    

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }

};