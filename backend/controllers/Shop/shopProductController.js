import productSchema from "../../models/productModel.js";

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;

      default:
        sort.price = 1;
        break;
    }
    const products = await productSchema.find(filters).sort(sort);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "error occured" });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productSchema.findById(id);
    if (!product) {
      res.status(404).json({ success: false, message: "Not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "error occured" });
  }
};

export { getFilteredProducts, getProductDetails };
