import AddressSchema from "../../../models/Address.js";

// Add Address
const addAddress = async (req, res) => {
  try {
    const { userId, phone, pincode, address, notes, city } = req.body;
    if (!userId || !phone || !pincode || !address || !notes || !city) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required: userId, phone, pincode, address, notes, and city.",
      });
    }
    const newlyCreatedAddress = new AddressSchema({
      userId,
      pincode,
      phone,
      notes,
      city,
      address,
    });

    await newlyCreatedAddress.save();

    res.status(201).json({ success: true, data: newlyCreatedAddress });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
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
    const addressList = await AddressSchema.find({ userId });
    res.status(201).json({ success: true, data: addressList });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

// Update Address
const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res
        .status(400)
        .json({ success: false, message: "userId and addressId are required" });
    }

    const address = await AddressSchema.findOneAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true }
    );

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    res.status(200).json({ success: true, data: address });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete Address
const deleteAddress = async (req, res) => {
  try {
    const { addressId, userId } = req.params;

    if (!userId || !addressId) {
      return res
        .status(400)
        .json({ success: false, message: "userId and addressId are required" });
    }

    const deletedAddress = await AddressSchema.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!deletedAddress) {
      return res
        .status(400)
        .json({ success: false, message: "Address not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export { addAddress, deleteAddress, editAddress, fetchAllAddress };
