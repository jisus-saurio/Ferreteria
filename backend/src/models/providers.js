/*

Coleccion: Providers

Campos:
name
telephone
imge
*/

import { Schema, model } from "mongoose";

const providerSchema = new Schema(
  {
    name: {
      type: String,
    },
    telephone: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);
export default model("Providers", providerSchema);
