import express from "npm:express@4.17.1";
import mongoose from "npm:mongoose@8.0.0";
// connecto to MongoDB
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

// import endpoints

//Funciones post
import { postClient } from "./resolvers/post_client.ts";
import { postRestaurante } from "./resolvers/post_restaurante.ts";
import { postBooking} from "./resolvers/post_booking.ts";
//Funciones get
import{ get_client}from "./resolvers/get_client.ts"
import{ get_restaurante}from "./resolvers/get_restaurante.ts"
import { get_booking } from "./resolvers/get_booking.ts";
//Funciones Delete
import { deleteRestaurante } from "./resolvers/delete_restaurant.ts";
import { deleteBooking } from "./resolvers/delete_booking.ts";
import { delete_all_Restaurante } from "./resolvers/delete_all_restaurants.ts";




const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
console.info("MongoDB connected");

// create express app
const app = express();
app.use(express.json());

// create endpoints
app
  .post("/api/postClient", postClient)
  .post("/api/postRestaurante", postRestaurante)
  .post("/api/postBooking", postBooking)

  .get("/api/see_client/:dnicliente", get_client)
  .get("/api/see_restaurante/:CIF", get_restaurante)
  .get("/api/see_bookings/:dnicliente", get_booking)

  .delete("/api/delete_booking/:id_book", deleteBooking)
  .delete("/api/delete_restaurante/:id_restaurante", deleteRestaurante)
  .delete("/api/delete_all", delete_all_Restaurante);


// start express server
app.listen(6000, () => {
  console.info("Server started on port 6000");
});
