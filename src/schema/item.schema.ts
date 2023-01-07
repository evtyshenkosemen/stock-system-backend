import { object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    Item:
 *      type: object
 *      required:
 *        - title
 *        - description
 *      properties:
 *        title:
 *          type: string
 *          default: Red book
 *        description:
 *          type: string
 *          default: Book with black text
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    description: string({
      required_error: "Description is required",
    })
  }),
};

const params = {
  params: object({
    itemId: string({
      required_error: "itemId is required",
    }),
  }),
};

export const createItemSchema = object({
  ...payload,
});

export const updateItemSchema = object({
  ...payload,
  ...params,
});

export const deleteItemSchema = object({
  ...params,
});

export const getItemSchema = object({
  ...params,
});

export type CreateItemInput = TypeOf<typeof createItemSchema>;
export type UpdateItemInput = TypeOf<typeof updateItemSchema>;
export type ReadItemInput = TypeOf<typeof getItemSchema>;
export type DeleteItemInput = TypeOf<typeof deleteItemSchema>;
