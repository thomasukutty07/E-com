import paypal from "../../helpers/paypal.js";
import OrderSchema from "../../models/Orders.js";

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
    } = req.body;

    // Determine currency dynamically
    const acceptedCurrency = paymentMethod === "paypal" ? "USD" : "EUR";

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
              currency: acceptedCurrency,
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: acceptedCurrency,
            total: totalAmount.toFixed(2),
          },
          description: "Order Payment",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.error("PayPal Error:", error.response);
        return res.status(500).json({
          success: false,
          message: error.response?.message || "Error while creating PayPal payment",
        });
      } else {
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
        });

        await newlyCreatedOrder.save();

        const approvalURL = paymentInfo.links.find((link) => link.rel === "approval_url").href;

        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newlyCreatedOrder._id,
        });
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Some error occurred!" });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId } = req.body;

    const execute_payment_json = {
      payer_id: payerId,
    };

    paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
      if (error) {
        console.error("PayPal Execution Error:", error.response);
        return res.status(400).json({ success: false, message: error.response?.message || "Payment execution failed" });
      }

      await OrderSchema.findOneAndUpdate(
        { paymentId },
        { paymentStatus: "Completed", orderStatus: "Confirmed" },
        { new: true }
      );

      res.status(200).json({ success: true, message: "Payment successful" });
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export { createOrder, capturePayment };
