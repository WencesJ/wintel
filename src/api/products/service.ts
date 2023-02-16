// NODE MODULES
import { Model } from 'mongoose';
import { Request } from 'express';

// PRODUCT MODULES
import ProductsModel, { ProductDocument } from './Model';
import ApiFeatures from '@libs/shared/utils/ApiFeatures';
import CONSTANTS from '@libs/shared/constants';
import { AppError } from '@libs/error';

const { STATUS } = CONSTANTS;

// end requiring the modules

interface DataTemplate {
    [unit: string]: string;
}

type CustomModel = Model<ProductDocument> & ProductDocument;

interface PopulateInterface {
    path: string
}

type PopulateOptions = PopulateInterface[] | string[];


class ProductService extends ApiFeatures {
    /**
     * Creates product controller
     * @param {Object} [productModel = ProductModel] - Instance of a Mongoose Schema of Product Model
     * @param {Object} [eventEmitter = compEmitter] - Instance of an Emitter that suscribes to a database operation
     *
     */

    constructor(
        protected ProductModel = ProductsModel as CustomModel,
    ) {
        super();
    }

    /**
     * Creates an Product.
     * @async
     * @param {Object} details - Details required to create a Product.
     * @returns {Object} Returns the created Product
     * @throws Mongoose Error
     */

    async create(details: Record<string, unknown>) {
        /**
         * @type {Object} - Holds the created data object.
         */
        const product = await this.ProductModel.create({
            ...details,
        });

        return { product };
    };

    /**
     * Finds one Product Data by it's id or Company.
     * @async
     * @param {string} id/company - unique id or company of the requested data.
     * @returns {Object} Returns the found requested data
     * @throws Mongoose Error
     */
    async get(query: Record<string, unknown>, populateOptions: PopulateOptions = []) {
        let product = await this.ProductModel.findOne({ ...query }).populate(populateOptions);

        if (!product) {
            throw new AppError('Invalid Product. Product Does Not Exist!', STATUS.BAD_REQUEST);
        }

        return { product };
    };

    /**
     * Finds one All Data matching a specified query but returns all if object is empty.
     * @async
     * @param {Object} query - finds data based on queries.
     * @returns {Object} Returns the found requested data
     * @throws Mongoose Error
     */
    async getAll(query: Record<string, unknown>, populateOptions?: PopulateOptions) {
        let productsQuery = this.api(this.ProductModel, query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    if (populateOptions !== undefined)
    productsQuery = productsQuery.populate(populateOptions);

    const products = await productsQuery.query.lean();

    return { products };

    };

    /**
     * Deletes one Product Data by it's id or Company name.
     * @async
     * @param {string} id/company - unique id or company of the requested data.
     * @returns {} Returns null
     * @throws Mongoose Error
     */
    async delete(query: Record<string, unknown>) {
        const product = await this.ProductModel.findOneAndDelete({ ...query });

        if (!product) {
            throw new AppError('Invalid Product. Product Does Not Exist!', STATUS.BAD_REQUEST);
        }
        
        return { product };
    };

    /**
     * Updates one Product Data by it's id or company name.
     * @async
     * @param {string} id/company - unique id or company of the requested data.
     * @returns {Object} Returns the found requested data
     * @throws Mongoose Error
     */
    async update(query: Record<string, unknown>, details: Record<string, unknown>, populate: PopulateOptions = []) {
        const product = await this.ProductModel.findOneAndUpdate(
            query,
            { ...details },
            {
                new: true,
                runValidators: true,
                populate
            }
        );

        if (!product) {
            throw new AppError('Invalid Product. Product Does Not Exist!', STATUS.BAD_REQUEST);

        }

        return { product }
    };

    async count(query: Record<string, unknown>) {
        if (Object.keys(query).length === 0) return await this.ProductModel.estimatedDocumentCount();

        return await this.ProductModel.countDocuments(query);
    }
}

export default new ProductService();
