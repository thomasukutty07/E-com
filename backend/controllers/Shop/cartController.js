import cartSchema from "../../models/cart.js";
import productSchema from "../../models/productModel.js";

const addToCart = async (req, res) => {
  try {
    const { productId, userId, quantity } = req.body;

    if (!productId || !userId || quantity <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid data provided" });
    }
    const findProduct = await productSchema.findById(productId);
    if (!findProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Product" });
    }

    let cart = await cartSchema.findOne({ userId });

    if (!cart) {
      cart = new cartSchema({ userId, items: [] });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.log(error);

    res.status(404).json({ success: false, message: error.message });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(404)
        .json({ success: false, message: "UserId is mandatory" });
    }
    const cart = await cartSchema.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      data: { ...cart._doc, items: populateCartItems },
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({ success: false, message: error.message });
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const { productId, userId, quantity } = req.body;

    if (!productId || !userId || quantity < 0) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    const cart = await cartSchema.findOne({ userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const currentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (currentProductIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item is not present" });
    }

    cart.items[currentProductIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId?._id || null,
      image: item.productId?.image || null,
      title: item.productId?.title || "Product not found",
      price: item.productId?.price || null,
      salePrice: item.productId?.salePrice || null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: { ...cart._doc, items: populateCartItems },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteCartItems = async (req, res) => {
  try {
    const { productId, userId } = req.params;
    if (!productId || !userId) {
      res
        .status(404)
        .json({ success: false, message: "Invalid data provided" });
    }
    const cart = await cartSchema.findOne({ userId }).populate({
      path: "items.productId",
      select: "title image price salePrice",
    });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );
    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      data: { ...cart._doc, items: populateCartItems },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: error.message });
  }
};

export { deleteCartItems, updateCartItemQuantity, fetchCartItems, addToCart };
