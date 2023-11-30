import mongoose from "npm:mongoose@8.0.0";
import { Client } from "../types.ts";

const Schema = mongoose.Schema;

export type ClientModelType= mongoose.Document;

const validateDNI=function(DNI: string){

  var exp=/^[XYZ]?\d{5,8}[A-Z]$/;
  
  DNI= DNI.toUpperCase();

     
    return exp.test(DNI);
  
}

const validateEmail=function(email:string){

   var exp= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
   
   return exp.test(email);
}

const valstring= function(cadena:any){
  var exp = /[a-zA-Z]+/;

  return exp.test(cadena);
}

const ClientSchema = new Schema(
    {
      firstName:{ type: String, required: true, validate: [{validator: valstring,msg:'Error algun valor no es de tipo string'}]},
      lastName: { type: String, required: true, validate: [{validator: valstring,msg:'Error algun valor no es de tipo string'}]},
      email: { type: String, required: true, unique:true, validate:[{validator: validateEmail,msg: 'El EMAIL no esta escrito correctamente'},{validator: valstring,msg:'Error algun valor no es de tipo string'}]},
      phoneNumber: { type: String, unique:true, min:[9,'El numero debe tener al menos 9 digitos'],max:9, validate:[valstring,'Error algun valor no es de tipo string']},
      DNI: { type: String, required: true, unique:true, validate:[{validator: validateDNI,msg: 'El DNI no esta escrito correctamente'},{validator: valstring,msg:'Error algun valor no es de tipo string'}]},
      bookings: [{ type: Schema.Types.ObjectId, ref:"Booking"}],
    },
    { timestamps: true }
  );

export const ClientModel= mongoose.model<ClientModelType>("Cliente",ClientSchema);
