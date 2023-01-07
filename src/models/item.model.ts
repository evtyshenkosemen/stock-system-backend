import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ItemInput {
  title: string;
  description: string;
}

export interface ItemDocument extends ItemInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const itemSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
      unique: true,
      default: () => `item_${nanoid()}`,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ItemModel = mongoose.model<ItemDocument>("Item", itemSchema);

export default ItemModel;
