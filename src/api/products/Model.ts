// importing the modules

import { Schema, model, Document } from 'mongoose';

import { removeProps } from '@libs/models/modelUtils';
import { nanoid } from 'nanoid';

export interface ProductDocument extends Document {
    productId: Schema.Types.ObjectId;
    name: string;
    brand: string;
    type: string;
    model: string;
    year: string;
    stock: number;

    // STATICS
    findByModel: (model: string) => ProductDocument;
    findByProductId: (productId: string) => ProductDocument;
}

const productSchema: Schema<ProductDocument> = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            default: () => nanoid(12)
        },

        name: {
            type: String,
            required: [true, 'Product Must Have A Name!'],
            trim: true,
            lowercase: true,
        },
        
        brand: {
            type: String,
            required: [true, 'Product Must Have A Brand!'],
            trim: true,
            lowercase: true,
        },
        
        type: {
            type: String,
            required: [true, 'Product Must Have A Type!'],
            trim: true,
            lowercase: true,
        },
        
        model: {
            type: String,
            required: [true, 'Product Must Have A Model!'],
            trim: true,
            lowercase: true,
        },
        
        year: {
            type: String,
            required: [true, 'Product Must Have A Year!'],
            trim: true,
            lowercase: true,
        },

        stock: {
            type: Number,
            default: 0
        }
    },

    {
        toJSON: { 
            virtuals: true, 
            versionKey: false,
            //remove sensitive fields
            transform: removeProps([])
        },

        toObject: { virtuals: true, versionKey: false },

        timestamps: true, //Responsible for adding creation date and update date
    }
);

// indexing the doc for quick fetch

productSchema.index({ model: 1, type: 1, brand: 1 }, { unique: true });

// initiating the pre and post hooks
productSchema.pre<ProductDocument>('save', async function (next) {
    next();
});

// PRODUCT STATICS
productSchema.statics.findByModel = async function (model: string) {
    return await this.findOne({ model });
};
productSchema.statics.findByProductId = async function (productId: string) {
    return await this.findOne({ productId });
};

// PRODUCT METHODS

const Product = model('Product', productSchema);

export default Product;
