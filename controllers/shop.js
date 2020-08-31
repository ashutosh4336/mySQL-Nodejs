const Product = require('../models/Product');

// @desc        Get all Listed Product
// @route       GET api/v1/shop
// @access      Private (Loggedin User)

exports.getAllProductMethod = async (req, res, next) => {
  try {
    const data = await Product.fetchAll();
    // console.log(data);
    return res.status(200).json({ count: data[0].length, data: data[0] });
  } catch (err) {
    console.log(err);
  }
};

// @desc        Get Single Product
// @route       GET api/v1/shop/:id
// @access      Public

exports.getSingleProductMethod = async (req, res, next) => {
  try {
    const data = await Product.fetchSingleProduct(req.params.id);
    return res.status(200).json({ data: data[0] });
  } catch (err) {
    console.log(err);
  }
};

// @desc        Add Product
// @route       POST api/v1/shop
// @access      Private (Admin)

exports.addProductMethod = async (req, res, next) => {
  try {
    const reqProduct = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      image_url: req.body.image_url,
    };

    const product = new Product(
      null,
      reqProduct.title,
      reqProduct.price,
      reqProduct.description,
      reqProduct.image_url
    );

    product.addProduct();
    const newData = await Product.fetchAll();
    return res.status(200).json({
      msg: 'Product Added',
      count: newData[0].length,
      data: newData[0],
    });
  } catch (err) {
    console.log(err);
  }
};

// @desc        Update Product
// @route       PUT api/v1/shop
// @access      Private (Admin)

exports.updateSingleProductMethod = async (req, res, next) => {
  try {
    const data = await Product.fetchSingleProduct(req.params.id);
    return res.status(200).json({ data: data[0] });
  } catch (err) {
    console.log(err);
  }
};
