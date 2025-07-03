const User = require('../models/User');
const Feature = require('../models/AttractionModel'); // adjust path if needed

exports.addFavorite = async (req, res) => {
  const userEmail = req.user.email; 
  const { featureId } = req.body;

  if (!featureId) {
    return res.status(400).json({ message: 'Missing featureId' });
  }

  try {
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { $addToSet: { favorites: featureId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'Added to favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add favorite', error: err.message });
  }
};

exports.removeFavorite = async (req, res) => {
  const userEmail = req.user.email;
  const { featureId } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { $pull: { favorites: featureId } }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'Removed from favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove favorite', error: err.message });
  }
};

// This returns the full feature objects, not just IDs!
exports.getFavorites = async (req, res) => {
  const email = req.user?.email;

  if (!email) {
    return res.status(400).json({ message: "Missing user email" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const favoriteIds = user.favorites; // not 'favourites'

    if (!favoriteIds || favoriteIds.length === 0) {
      return res.json([]); // Return empty array if no favorites
    }

    const favoriteFeatures = await Feature.aggregate([
      { $unwind: "$features" },
      { $match: { "features.id": { $in: favoriteIds } } },
      { $replaceRoot: { newRoot: "$features" } }
    ]);

    res.json(favoriteFeatures);
  } catch (error) {
    res.status(500).json({ message: "Failed to get favorites", error: error.message });
  }
};
