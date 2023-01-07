import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ItemModel, {
  ItemDocument,
  ItemInput,
} from "../models/item.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createItem(input: ItemInput) {
  const metricsLabels = {
    operation: "createItem",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await ItemModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function findItem(
  query: FilterQuery<ItemDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findItem",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await ItemModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAndUpdateItem(
  query: FilterQuery<ItemDocument>,
  update: UpdateQuery<ItemDocument>,
  options: QueryOptions
) {
  return ItemModel.findOneAndUpdate(query, update, options);
}

export async function deleteItem(query: FilterQuery<ItemDocument>) {
  /* ToDo: Fix return code */
  return ItemModel.deleteOne(query);
}
