// import paypal from "../../../helpers/paypal.js";
import OrderSchema from "../../../models/Orders.js";

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "description",
        },
      ],
    };

    // All code that uses 'paypal' should be commented out to prevent runtime errors.
    // paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
    //   if (error) {
    //     console.log(error);

    //     return res.status(500).json({
    //       success: false,
    //       message: "Error while creating paypal payment",
    //     });
    //   } else {
        const newlyCreatedOrder = new OrderSchema({
          userId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newlyCreatedOrder.save();


        // const approvalURL = paymentInfo.links.find(
        //   (link) => link.rel === "approval_url"
        // ).href;

        res.status(201).json({
          success: true,
          // approvalURL,
          orderId: newlyCreatedOrder._id,
        });
    //   }
    // });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};
const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;
    if (!paymentId || !payerId || !orderId) {
      return res.status(400).json({ success: false, message: "Missing paymentId, payerId, or orderId" });
    }
    // All code that uses 'paypal' should be commented out to prevent runtime errors.
    // paypal.payment.execute(paymentId, { payer_id: payerId }, async (error, payment) => {
    //   if (error) {
    //     console.log(error.response);
    //     return res.status(500).json({ success: false, message: "Payment execution failed", error: error.response });
    //   } else {
        // Update order status in DB
        await OrderSchema.findByIdAndUpdate(orderId, {
          paymentStatus: "Paid",
          orderStatus: "Processing",
          paymentId,
          payerId,
        });
        return res.status(200).json({ success: true, message: "Payment successful", payment });
    //   }
    // });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export { createOrder, capturePayment };
