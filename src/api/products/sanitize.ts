import { registerSanitizeSchema } from '@libs/validations/joiSchema';
import Joi from 'joi';

const defaultStringValidate = Joi.string().lowercase().trim();


/**
 * @description Joi Schema Validation For Product Feature
 */

interface ProductSanitizeInterface {
    createProduct: string,
    getProduct: string,
    updateProduct: string,
    deleteProduct: string,
}

const ProductSanitize = {
    createProduct: {
        params: {},
    
        body: {
            name: defaultStringValidate
                .required()
                .min(3)
                .max(50),
                
            brand: defaultStringValidate
                .required()
                .min(3)
                .max(50),
                
            type: defaultStringValidate
                .required()
                .min(3)
                .max(50),
                
            model: defaultStringValidate
                .required()
                .min(2)
                .max(50),
                
            year: defaultStringValidate
                .required()
                .min(4)
                .max(4),

            stock: Joi.number().required().default(0)
        },
    },
    
    getProduct: {
        params: {
            _id: defaultStringValidate.required(),
        },
    
        body: {},
    },

    updateProduct: {
        params: {
            _id: defaultStringValidate.required(),
        },
    
        body: {
            name: defaultStringValidate
                .min(3)
                .max(50),
                
            brand: defaultStringValidate
                .min(3)
                .max(50),
                
            type: defaultStringValidate
                .min(3)
                .max(50),
                
            model: defaultStringValidate
                .min(2)
                .max(50),
                
            year: defaultStringValidate
                .min(4)
                .max(4),

            stock: Joi.number().default(0)
            // other product details like description, etc.
        },
    },
    
    deleteProduct: {
        params: {
            _id: defaultStringValidate.required(),
        },
    
        body: {},
    },
}

export default registerSanitizeSchema(ProductSanitize) as unknown as ProductSanitizeInterface;
