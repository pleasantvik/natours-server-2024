const RESULT_PER_PAGE = 10;
class APIFeatures {
  constructor(model, queryParams) {
    this.Model = model;
    this.queryParams = queryParams;
  }

  filter() {
    const queryObj = { ...this.queryParams };
    const excludedField = ['page', 'sort', 'limit', 'fields'];

    excludedField.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.Model = this.Model.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryParams.sort) {
      const sortBy = this.queryParams.sort.split(',').join(' ');
      this.Model = this.Model.sort(sortBy);
    } else {
      this.Model = this.Model.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryParams.fields) {
      const fields = this.queryParams.fields.split(',').join(' ');

      this.Model = this.Model.select(fields);
    } else {
      this.Model = this.Model.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = +this.queryParams.page || 1;
    const limit = +this.queryParams.limit || RESULT_PER_PAGE;

    const skip = (page - 1) * limit;

    this.Model = this.Model.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
