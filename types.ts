import mongoose from "npm:mongoose@8.0.0";

export type Client={
    firstname:string,
    lastname:string,
    email:string,
    phoneNumber:string,
    DNI:string,
    bookings:string[]
}

export type Restaurante={
    name:string,
    CIF:string,
    address:string,
    bookings:string[]
}

export type Booking={
    id:number,
    date:string,
    client:string,
    bookings:string
}

