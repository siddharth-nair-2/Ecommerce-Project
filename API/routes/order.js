const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER ORDERS

router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get(
  "/findProd/:prodId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const orders = await Order.find({
        products: { $elemMatch: { productId: req.params.prodId } },
      });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// // GET ALL
router.get("/findAll", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const orders = query
      ? await Order.find().sort({ createdAt: -1 }).limit(5)
      : await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY STATS

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const userId = req.query.uid;
  const date = new Date();
  const thisMonth = new Date(date.setMonth(date.getMonth()));
  const previousMonth = new Date(new Date().setMonth(thisMonth.getMonth() - 6));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
          ...(userId && {
            userId: userId,
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/orderCount", verifyTokenAndAdmin, async (req, res) => {
  try {
    const data = await Order.aggregate([
      {
        $count: "all_orders",
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/orderCountToday", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  date.setUTCHours(0);
  date.setUTCMinutes(0);
  date.setUTCSeconds(0);
  try {
    const data = await Order.aggregate([
      { $match: { createdAt: { $gt: date } } },
      {
        $count: "all_orders",
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/incomeToday", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  date.setUTCHours(0);
  date.setUTCMinutes(0);
  date.setUTCSeconds(0);

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gt: date } } },
      {
        $project: {
          date: { $dayOfMonth: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$date",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/incomeLastWeek", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastWeekDate = new Date();
  lastWeekDate.setDate(date.getDate() - 7);

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $lt: date, $gt: lastWeekDate } } },
      {
        $project: {
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "total",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/incomeLastMonth", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastWeekDate = new Date();
  lastWeekDate.setDate(date.getDate() - 30);

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $lt: date, $gt: lastWeekDate } } },
      {
        $project: {
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "total",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/incomeAllTime", verifyTokenAndAdmin, async (req, res) => {
  try {
    const income = await Order.aggregate([
      {
        $project: {
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "total",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
