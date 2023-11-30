import mongoose from "npm:mongoose@8.0.0";
import { Booking } from "../types.ts";
import { RestauranteModel } from "../db/restaurante_schema.ts";
import { ClientModel } from "../db/client_schema.ts";


const Schema = mongoose.Schema;

export type BookingModelType= mongoose.Document;

const valstring= function(cadena:any){
  var exp = /[a-zA-Z]+/;

  return exp.test(cadena);
}

const BookingSchema = new Schema(
    {
      //He creado un nuevo id para identificar el Booking
      id: { type:Number,unique:true },
      date: { type: Date, default: Date.now },
      client: { type: String, validate: [{validator: valstring,msg:'Error algun valor no es de tipo string'}]},
      restaurant: { type: String, validate: [{validator: valstring,msg:'Error algun valor no es de tipo string'}]},
    },
    { timestamps: true }
  );

  BookingSchema.post("findOne", function(doc){
    if(doc === null || doc === undefined){
      throw new Error("No booking found");
    }
  });

  BookingSchema.post("save",function(doc){
     
     const res= RestauranteModel.findOneAndUpdate({CIF: doc.restaurant},
       {"$push": {"bookings": doc.id}},
       {"new":true, "upsert": true});

      const cli= ClientModel.findOneAndUpdate({DNI: doc.client},
        {"$push":{"bookings":doc.id}},
        {"new":true, "upsert": true});
        
  });

  

export const BookingModel= mongoose.model<BookingModelType>("Booking",BookingSchema);

