import Birthday from "../models/Birthday.js";
import User from "../models/User.js";
import Contribution from "../models/Contribution.js";

export const createBirthday = async (req, res) => {
  try {
    const { userId, date, contributionAmount } = req.body;

    // Check if birthday already exists for date
    const existing = await Birthday.findOne({
      date: new Date(date),
      active: true,
    });

    if (existing) {
      return res.status(400).json({
        message: "Birthday already exists for this date",
      });
    }

    // Create birthday
    const birthday = await Birthday.create({
      user: userId,
      date: new Date(date),
      contributionAmount,
      active: true,
    });

    // Fetch all members except birthday boy
    const members = await User.find({
      _id: { $ne: userId },
    });

    // Create pending contributions
    const contributions = members.map((member) => ({
      birthday: birthday._id,
      user: member._id,
      amount: contributionAmount,
      status: "pending",
    }));

    await Contribution.insertMany(contributions);

    res.status(201).json({
      message: "Birthday created successfully",
      birthday,
      totalContributors: members.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
