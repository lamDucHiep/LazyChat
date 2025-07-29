const Record = require("./../../model/record");
const mongoose = require("mongoose");
//[GET]
module.exports.getStatistic = (req, res) => {
  const username = req.cookies.username;
  const headerContent = "Số tiền bạn đã dùng: ";
  res.render("client/pages/statistic", { headerContent, username });
};

module.exports.getExpenseData = async (req, res) => {
  try {
    const ownerId = req.user.userId;
    const data = await Record.aggregate([
      {
        $match: {
          loai: "chi",
          owner: mongoose.Types.ObjectId.createFromHexString(ownerId),
        },
      },
      { $group: { _id: "$mo_ta", totalAmount: { $sum: "$so_tien" } } },
      { $sort: { totalAmount: -1 } },
    ]);

    const labelMap = {
      investing: "Đầu tư",
      food: "Ăn uống",
      hang_out: "Đi chơi",
      shopping: "Mua sắm",
      fuel: "Di chuyển",
      others: "Khác",
    };

    // const labels = data.map((d) => d._id || "Khác");
    const labels = data.map((d) => labelMap[d._id] || "Khác");
    const amounts = data.map((d) => d.totalAmount);

    res.json({ labels, amounts });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
