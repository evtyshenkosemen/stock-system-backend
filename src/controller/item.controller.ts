import { Request, Response } from "express";
import {
  CreateItemInput,
  UpdateItemInput,
} from "../schema/item.schema";
import {
  createItem,
  deleteItem,
  findAndUpdateItem,
  findItem,
} from "../service/item.service";

export async function createItemHandler(
  req: Request<{}, {}, CreateItemInput["body"]>,
  res: Response
) {
    const body = req.body;

    const item = await createItem({ ...body/*, user: userId*/ });

    return res.send(item);
}

export async function updateItemHandler(
  req: Request<UpdateItemInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const itemId = req.params.itemId;
  const update = req.body;

  const item = await findItem({ itemId });

  if (!item) {
    return res.sendStatus(404);
  }

  const updatedItem = await findAndUpdateItem({ itemId }, update, {
    new: true,
  });

  return res.send(updatedItem);
}

export async function getItemHandler(
  req: Request<UpdateItemInput["params"]>,
  res: Response
) {
  const itemId = req.params.itemId;
  const item = await findItem({ itemId });

  if (!item) {
    return res.sendStatus(404);
  }

  return res.send(item);
}

export async function deleteItemHandler(
  req: Request<UpdateItemInput["params"]>,
  res: Response
) {
  const itemId = req.params.itemId;

  const item = await findItem({ itemId });

  if (!item) {
    return res.sendStatus(404);
  }

  await deleteItem({ itemId });

  return res.sendStatus(200);
}
