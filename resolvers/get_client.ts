// @ts-expect-error
import { Request, Response } from "npm:express@4.17.1";
import { ClientModel } from "../db/client_schema.ts";

export const get_client = async (req: Request, res: Response) => {
  try {

  const {dnicliente}= req.params;
  const client =await ClientModel.findOne({DNI: dnicliente}).exec();  

    res.status(200).send(
        client,
      );

  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};