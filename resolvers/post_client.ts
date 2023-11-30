// @ts-expect-error
import { Request, Response } from "npm:express@4.17.1";
import { ClientModel } from "../db/client_schema.ts";

export const postClient = async (req: Request, res: Response) => {

  const { firstName,lastName,email,phoneNumber,DNI } = req.body;

 try {
    
  try {
      const contact = new ClientModel({
        firstName,
        lastName,
        email,
        phoneNumber,
        DNI
      });

      await contact.save();

      res.status(200).send({
        firstName,
        lastName,
        email,
        phoneNumber,
        DNI
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