import mongoose from "npm:mongoose@8.0.0";
import { Restaurante } from "../types.ts";
import { Client } from "../types.ts";
import { ClientModel } from "./client_schema.ts";

const Schema = mongoose.Schema;

export type RestauranteModelType= mongoose.Document;

const valstring= function(cadena:any){
  var exp = /[a-zA-Z]+/;

  return exp.test(cadena);
}
const RestauranteSchema = new Schema(
    {
      name:{ type: String, required: true, unique:true, validate: [{validator: valstring,msg:'Error algun valor no es de tipo string'}]},
      CIF: { type: String, required: true, unique:true, validate: [{validator: valstring,msg:'Error algun valor no es de tipo string'}]},
      address: { type: String, required: true, validate: [{validator: valstring,msg:'Error algun valor no es de tipo string'}]},
      bookings: [{ type: Schema.Types.ObjectId, ref:"Booking"}],
    },
    { timestamps: true }
  );

  RestauranteSchema.post("deleteOne",function(doc){
     
    const res= RestauranteModel.findOneAndUpdate({CIF: doc.restaurant},
      {"$pull": {"bookings": doc.id}},
      {"new":true, "upsert": true});

     const cli= ClientModel.findOneAndUpdate({DNI: doc.client},
       {"$pull":{"bookings":doc.id}},
       {"new":true, "upsert": true});
       
 });

export const RestauranteModel= mongoose.model<RestauranteModelType>("Restaurante",RestauranteSchema);
