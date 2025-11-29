const express = require("express");
const router = express.Router();
const got = require("got").default;
const Order = require("../models/Order");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

router.post("/confirm", auth, async (req, res) => {
  try {
    const { paymentKey, orderId, amount, items } = req.body;
    const userId = req.user.id;

    const widgetSecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

    const encryptedSecretKey =
      "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");

    const paymentData = await got.post(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        headers: {
          Authorization: encryptedSecretKey,
          "Content-Type": "application/json",
        },
        json: { paymentKey, orderId, amount },
      }
    ).json();

    const orderItems = items.map(item => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image
    }));

    const newOrder = await Order.create({
      user: userId,
      orderId,
      paymentKey,
      amount: paymentData.totalAmount,
      method: paymentData.method,
      items: orderItems,
      status: paymentData.status,
    });

    res.json({ success: true, order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "결제 확인 실패", error: err });
  }
});

router.get("/my", auth, async (req, res) => {
  const userId = req.user.id;
  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

  res.json(orders);
});

module.exports = router;
