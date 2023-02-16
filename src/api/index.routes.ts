import { Router } from 'express';

//Features
import { Router as productRouter } from '@api/products';

import { STATUS } from '@libs/shared/constants/responseConstants';

const router = Router();

router.use('/products', productRouter);

router.get('/', (_, res) => {
    res.status(STATUS.ACCEPTED).json({
        greetings: '<h1>Welcome to Wintel Api 1</h1>'
    });
});
export default router;
