import { Model } from 'mongoose';

import { Request } from 'express';

interface PopulateInterface {
    path: string
}

type PopulateOptions = PopulateInterface[] | string[];

class ApiFeatures {
    protected query: any;
    protected queryString: any;

    api(Model: Model<any>, queryString: Record<string, unknown>) {
        this.query = Model.find();
        this.queryString = queryString;

        return this;
    }

    filter() {
        if (Object.entries(this.queryString).length !== 0) {
            const queryObj = { ...this.queryString };
            const excludeObj = ['page', 'sort', 'limit', 'fields'];

            // REMOVE THE KEYS IN excludeObj from queryObj
            excludeObj.forEach((el) => delete queryObj[el]);

            // CHANGE (lt, gt, lte, gte) to ($lt, $gt, $lte, $gte)
            let stringObj = JSON.stringify(queryObj);

            stringObj = stringObj.replace(
                /\b(gt|lt|lte|lte)\b/g,
                (match) => `$${match}`
            );

            this.query.find(JSON.parse(stringObj));
        }
        return this;
    }

    sort() {
        // sort takes values in this format sort('price age -name')

        if (this.queryString.sort) {
            const sortVal = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortVal);

            return this;
        }

        this.query = this.query.sort('createdAt');

        return this;
    }

    limitFields() {
        // select takes values in this format select('price age -name')
        if (this.queryString.fields) {
            const fieldsVal = this.queryString.fields.split(',').join(' ');

            this.query = this.query.select(fieldsVal);
        }

        this.query = this.query.select('-v');

        return this;
    }

    paginate() {
        // PAGINATION
        const page = this.queryString.page || 1;
        const limit = +this.queryString.limit || 10;

        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }

    populate(populateOptions: PopulateOptions) {
        // PAGINATION
        if (populateOptions === undefined) return this;

        this.query = this.query.populate(populateOptions);

        return this;
    }
}

export default ApiFeatures;
