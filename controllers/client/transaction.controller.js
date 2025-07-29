const Record = require("../../model/record");

module.exports.getChat = (req, res) => {
  const username = req.cookies.username;
  const headerContent = "Lịch sử giao dịch";
  res.render("client/pages/transaction", { username, headerContent });
};

module.exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const records = await Record.find({ owner: userId }).sort({
      createdAt: -1,
    });
    res.json({ success: true, records });
  } catch (error) {
    console.error("Lỗi lấy lịch sử giao dịch:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.getFilteredTransactions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu startDate hoặc endDate." });
    }
    const filter = {
      owner: userId,
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate).setHours(23, 59, 59, 999),
      },
    };

    const data = await Record.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      records: data,
      startDate,
      endDate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Lỗi server." });
  }
};

module.exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Record.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Không tìm thấy bản ghi để xóa" });
    }
    res.status(200).json({ message: "Xóa thành công", deletedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports.putTransaction = async (req, res) => {
  const transactionId = req.params.id;
  const userId = req.user.userId;

  try {
    const transaction = await Record.findOne({
      _id: transactionId,
      owner: userId,
    });
    if (!transaction) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy khoản chi tiêu." });
    }

    const { so_tien } = req.body;
    if (typeof so_tien !== "number" || isNaN(so_tien)) {
      return res
        .status(400)
        .json({ message: '"so_tien" phải là một số hợp lệ.' });
    }
    if (so_tien) transaction.so_tien = so_tien;

    const updated = await transaction.save();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi máy chủ." });
  }
};
