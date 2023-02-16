// NODE MODULES
import fs from "fs";

// PRODUCT MODULES
import productService from "./service";

import { CustomRequest } from "@libs/shared/helpers";

import { Response, NextFunction, RequestHandler, Request } from "express";

import { AppError, catchAsync } from "@libs/error";

import CONSTANTS from "@libs/shared/constants";

const { STATUS, MSG } = CONSTANTS;

const NAME = "Product";

// end of requiring the modules

// PRODUCT AUTHENTICATION CONTROLLERS
/**
 * Product Controller class
 * @class
 */

class ProductController {
  /**
   * @description Creates product controller
   * @param {Object} [productService = productServiceInstance] - same as productServiceInstance Object
   *
   */

  constructor(public ProductService = productService) {
    /**
     * @type {Object}
     * @borrows productService
     */
  }

  /**
   * Creates a Product
   * @async
   * @access public
   */
  createProduct: RequestHandler = catchAsync(
    async (req: CustomRequest, res: Response) => {
      /**
       * @type {Object} - An Object of fields required for creating a Product.
       */
      const productDetails = { ...req.body };

      /**
       * @type {Object} - Holds the created data object.
       */
      const { product } = await this.ProductService.create(productDetails);

      // Returns a json response
      res.status(STATUS.CREATED).json({
        status: MSG.SUCCESS,
        message: `${NAME} created successfully.`,
        product,
      });
    }
  );

  /**
   * Gets one Product Data
   * @async
   * @route {GET} /:_id
   * @access protected
   */
  getProduct: RequestHandler = catchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      /**
       * @type {Object} - An Object of fields to be queried.
       */

      const queryFields = req.params;

      /**
       * @type {Object|null} - Holds either the returned data object or null.
       *
       * @description Use Either a mongodbUniqueId to Search
       */

      const { product } = await this.ProductService.get({ $or: [{ _id: queryFields._id }, { productId: queryFields._id}] });

      // Returns a json response
      res.status(STATUS.OK).json({
        status: MSG.SUCCESS,
        message: `${NAME} fetched successfully.`,
        product,
      });
    }
  );

  /**
   * Gets All Product Datas
   * @async
   * @route {GET} /
   * @access public
   */
  getAllProducts = catchAsync(async (req: CustomRequest, res: Response) => {
    /**
     * @type {Object} - An Object of fields to be queried.
     *
     * @empty - Returns Whole Data In Products Product
     */
    const queryFields = req.query;

    /**
     * @type {Object|null} - Holds either the returned data object or null.
     */
    const { products } = await this.ProductService.getAll(queryFields);

    const pagination = {
        page: (queryFields?.page) ? +queryFields.page : 1,
        limit: (queryFields?.limit) ? +queryFields.limit : 10,
        count: products.length,
        total: await this.ProductService.count(queryFields)
    }
    // Returns a json response
    res.status(STATUS.OK).json({
      status: MSG.SUCCESS,
      message: `${NAME}s fetched successfully.`,
      products,
      pagination
    });
  });

  /**
   * Deletes one Product Data
   * @async
   * @access protected
   */
  deleteProduct = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      /**
       * @type {Object} - An Object of fields to be queried.
       */
      const queryFields = { ...req.params };
      /**
       * @type {Object|null} - Holds either the returned data object or null.
       *
       * @description deletes a product
       */

      await this.ProductService.delete({ $or: [{ _id: queryFields._id }, { productId: queryFields._id}] });

      // Returns a json response
      res.status(STATUS.NO_CONTENT).json({
        status: MSG.SUCCESS,
        message: `${NAME} deleted successfully.`,

      });
    }
  );

  /**
   * Updates one Product Data
   * @async
   * @access protected
   */

  updateProduct = catchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      /**
       * @type {Object} - An Object of fields to be queried.
       */
      const queryParams = { ...req.params };

      const queryFields = { ...req.body };

      /**
       * @type {Object|null} - Holds either the returned data object or null.
       *
       * @description Updates a product
       */

      const { product } = await this.ProductService.update({ $or: [{ _id: queryParams._id }, { productId: queryParams._id}] }, queryFields);

      // Returns a json response
      res.status(STATUS.ACCEPTED).json({
        status: MSG.SUCCESS,
        message: `${NAME}s updated successfully.`,
        product,
      });
    }
  );
}

const productCntrl = new ProductController();

export default productCntrl;
