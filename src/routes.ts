import { Express, Request, Response } from "express";

/* Controllers */
import {
  createProductHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "./controller/product.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import {
  createItemHandler,
  getItemHandler,
  updateItemHandler,
  deleteItemHandler,
} from "./controller/item.controller";

/* Middlewares */
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";

/* Schemas */
import {
  createItemSchema,
  deleteItemSchema,
  getItemSchema,
  updateItemSchema,
} from "./schema/item.schema";

import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema/product.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );

  /**
   * @openapi
   * '/api/products/{productId}':
   *  get:
   *     tags:
   *     - Products
   *     summary: Get a single product by the productId
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/Product'
   *       404:
   *         description: Product not found
   */
  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );

  app.get(
    "/api/products/:productId",
    validateResource(getProductSchema),
    getProductHandler
  );

  app.delete(
    "/api/products/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );

/**
 * @openapi
 * '/api/item/{itemId}':
 *  post:
 *     tags:
 *     - Items
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 */
  app.post(
    "/api/item/",
    [requireUser, validateResource(createItemSchema)],
    createItemHandler
  );

/**
 * @openapi
 * '/api/item/{itemId}':
 *  get:
 *     tags:
 *     - Items
 *     summary: Get a single item by the itemId
 *     parameters:
 *      - name: ItemId
 *        in: path
 *        description: The id of the item
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 */

  app.get(
    "/api/item/:itemId",
    [requireUser, validateResource(getItemSchema)],
    getItemHandler
  );

/**
 * @openapi
 * '/api/item/{itemId}':
 *  put:
 *     tags:
 *     - Items
 *     summary: Update item by itemId
 *     parameters:
 *      - name: ItemId
 *        in: path
 *        description: The id of the item
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 */

  app.put(
    "/api/item/:itemId",
    [requireUser, validateResource(updateItemSchema)],
    updateItemHandler
  );

/**
 * @openapi
 * '/api/item/{itemId}':
 *  get:
 *     tags:
 *     - Items
 *     summary: Get a single item by the itemId
 *     parameters:
 *      - name: ItemId
 *        in: path
 *        description: The id of the item
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 */

  app.get(
    "/api/item/:itemId",
    [requireUser, validateResource(getItemSchema)],
    getItemHandler
  );

/**
 * @openapi
 * '/api/item/{itemId}':
 *  get:
 *     tags:
 *     - Items
 *     summary: Get a single item by the itemId
 *     parameters:
 *      - name: ItemId
 *        in: path
 *        description: The id of the item
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 */

  app.get(
    "/api/item/:itemId",
    [requireUser, validateResource(getItemSchema)],
    getItemHandler
  );

/**
 * @openapi
 * '/api/item/{itemId}':
 *  delete:
 *     tags:
 *     - Items
 *     summary: Delete item by itemId
 *     parameters:
 *      - name: ItemId
 *        in: path
 *        description: The id of the item
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Item not found
 */

  app.delete(
    "/api/item/:itemId",
    [requireUser, validateResource(deleteItemSchema)],
    deleteItemHandler
  );


}

export default routes;
