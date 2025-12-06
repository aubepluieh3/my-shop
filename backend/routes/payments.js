const express = require("express");
const router = express.Router();
const got = require("got").default;
const Order = require("../models/Order");
const auth = require("../middleware/auth");
const User = require("../models/User");

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

    const monthlyTotal = await getUserMonthlyPayments(userId);
    const newLevel = calculateLevel(monthlyTotal);
    const updatedUser = await User.findByIdAndUpdate(
      userId, { level: newLevel }, { new: true });

    res.json({
      message: "결제 및 레벨 업데이트 완료",
      order: newOrder,
      newLevel: updatedUser.level
    });
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

async function getUserMonthlyPayments(userId) {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const orders = await Order.find({
    user: userId,
    status: "DONE",
    createdAt: { $gte: oneMonthAgo }
  });

  const totalAmount = orders.reduce((sum, o) => sum + o.amount, 0);
  return totalAmount;
}

function calculateLevel(amount) {
  if (amount >= 500000) return 5;
  if (amount >= 200000) return 4;
  if (amount >= 100000) return 3;
  if (amount >= 50000)  return 2;
  return 1;
}

module.exports = router;
