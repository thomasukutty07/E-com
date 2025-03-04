import addressSchema from "../../models/Address.js";

// Add Address
const addAddress = async (req, res) => {
  try {
    const { userId, phone, pincode, address, notes, city } = req.body;
    if (!userId || !phone || !pincode || !address || !notes || !city) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid details!" });
    }
    const newlyCreatedAddress = new addressSchema({
      userId,
      pincode,
      phone,
      notes,
      city,
      address,
    });

    await newlyCreatedAddress.save();

    res.status(200).json({ success: false, data: newlyCreatedAddress });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

// Fetch All address

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId is required" });
    }
    const addressList = await addressSchema.find({ userId });
    res.status(200).json({ success: true, data: addressList });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

// Update Address
const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const { formData } = req.body;
    if (!userId || !addAddress) {
      return res
        .status(400)
        .json({ success: false, message: "userdId and address is required" });
    }

    const address = await addressSchema.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );
    if (!address) {
      return res
        .status(400)
        .json({ success: false, message: "Address not found" });
    }
    res.status(200).json({ success: true, data: address });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

// Delete Address
const deleteAddress = async (req, res) => {
  try {
    const { productId, userId } = req.params;
    if (!userId || !addAddress) {
      return res
        .status(400)
        .json({ success: false, message: "userdId and address is required" });
    }
    const deleteAddress = addressSchema.findByIdAndDelete({
      _id: addressId,
      userId,
    });

    if (!deleteAddress) {
      res.status(200).json({ success: false, message: "Address not found" });
    }

    res
      .status(200)
      .json({ success: false, message: "Address deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

export { addAddress, deleteAddress, editAddress, fetchAllAddress };
