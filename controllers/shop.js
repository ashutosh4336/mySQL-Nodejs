const Product = require('../models/Product');

// @desc        Get all Listed Product
// @route       GET api/v1/shop
// @access      Private (Loggedin User)

exports.getAllProductMethod = async (req, res, next) => {
  try {
    const allProduct = await Product.findAll();
    res
      .status(200)
      .json({ code: 200, count: allProduct.length, data: allProduct });
  } catch (err) {
    console.log(err);
  }
};

// @desc        Get Single Product
// @route       GET api/v1/shop/:id
// @access      Public

exports.getSingleProductMethod = async (req, res, next) => {
  try {
    const data = await Product.findByPk(req.params.id);
    return res.status(200).json({ data: data });
  } catch (err) {
    console.log(err);
  }
};

// @desc        Add Product
// @route       POST api/v1/shop
// @access      Private (Admin)

exports.addProductMethod = async (req, res, next) => {
  try {
    const product = await Product.create({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      image_url: req.body.image_url,
    });
    res.status(200).json({ code: 201, product });
  } catch (err) {
    console.log(err);
  }
};

// @desc        Update Product
// @route       PUT api/v1/shop/:id
// @access      Private (Admin)

exports.updateSingleProductMethod = async (req, res, next) => {
  try {
    const newProduct = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      image_url: req.body.image_url,
    };

    await Product.update(newProduct, {
      where: { id: req.params.id },
    });

    return res.status(200).json({ msg: 'Your Product has been Updated' });
  } catch (err) {
    console.log(err);
  }
};

// @desc        Delete Product
// @route       Delete api/v1/shop/:id
// @access      Private (Admin)

exports.deleteSingleProductMethod = async (req, res, next) => {
  try {
    await Product.destroy({
      where: { id: req.params.id },
    });

    return res.status(200).json({ msg: 'Your Product has been Deleted' });
  } catch (err) {
    console.log(err);
  }
};
