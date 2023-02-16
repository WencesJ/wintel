// importing the modules

import { Router } from 'express';

import Controller from './controller';

import { reqValidate } from '@libs/validations';
import sanitize from './sanitize';

const {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
} = Controller;

const router = Router();

router.get('/', getAllProducts);

router.get('/:_id/single', reqValidate(sanitize.getProduct), getProduct);

router.route('/')
      .post(reqValidate(sanitize.createProduct), createProduct);

router.route('/:_id/single')
      .patch(reqValidate(sanitize.updateProduct), updateProduct)
      .delete(reqValidate(sanitize.deleteProduct), deleteProduct);

export default router;
