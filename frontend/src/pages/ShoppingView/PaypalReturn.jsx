import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const PaypalReturnPage = () => {
  const { orderId } = useSelector((state) => state.shopOrder);
  const [status, setStatus] = useState("Processing payment...");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentId = params.get("paymentId");
    const payerId = params.get("PayerID");
    if (paymentId && payerId && orderId) {
      axios
        .post(`/api/shop/order/capture`, {
          paymentId,
          payerId,
          orderId,
        })
        .then((res) => {
          if (res.data.success) {
            setStatus("Payment successful! Thank you for your purchase.");
            setTimeout(() => navigate("/shop/account"), 2000);
          } else {
            setStatus(
              "Payment failed: " + (res.data.message || "Unknown error")
            );
          }
        })
        .catch((err) => {
          setStatus(
            "Payment failed: " + (err.response?.data?.message || err.message)
          );
        });
    } else {
      setStatus("Missing payment information. Please contact support.");
    }
  }, [location.search, orderId, navigate]);

  return <div>{status}</div>;
};

export default PaypalReturnPage;
