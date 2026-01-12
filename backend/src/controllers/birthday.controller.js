import Birthday from "../models/Birthday.js";
import Contribution from "../models/Contribution.js";

/**
 * GET today's active birthday
 * Rule:
 * - Return birthday event
 * - Hide if logged-in user is birthday boy
 */
export const getTodaysBirthday = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const birthday = await Birthday.findOne({
      active: true,
      date: today,
    }).populate("user", "name");

    if (!birthday) {
      return res.status(404).json({ message: "No birthday today" });
    }

    // Hide birthday card for birthday boy
    if (birthday.user._id.toString() === req.user.id) {
      return res.status(200).json({ hidden: true });
    }

    res.status(200).json({
      hidden: false,
      birthday,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
