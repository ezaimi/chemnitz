const Feature = require('../models/AttractionModel');


exports.addReview = async (req, res) => {
  const { featureId } = req.params;
  const { rating, comment } = req.body;
  const email = req.user?.email;

  if (!featureId || !email || rating == null) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const featureDoc = await Feature.findOne({ 'features.id': featureId });
    if (!featureDoc) {
      return res.status(404).json({ message: 'Feature not found' });
    }

    const feature = featureDoc.features.find(f => f.id === featureId);
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found inside document' });
    }

    feature.reviews = feature.reviews || [];
    feature.reviews.push({
      email,
      comment: comment || '',
      rating: Number(rating),
      date: new Date()
    });

    // Update average rating
    const totalRating = feature.reviews.reduce((sum, r) => sum + r.rating, 0);
    feature.averageRating = totalRating / feature.reviews.length;

    await featureDoc.save();

    res.status(200).json({ message: 'Review added successfully', averageRating: feature.averageRating });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add review', error: err.message });
  }
};


exports.getReviews = async (req, res) => {
  const { featureId } = req.params;

  if (!featureId) {
    return res.status(400).json({ message: 'Missing featureId' });
  }

  try {
    const featureDoc = await Feature.findOne({ 'features.id': featureId });
    if (!featureDoc) {
      return res.status(404).json({ message: 'Feature not found' });
    }

    const feature = featureDoc.features.find(f => f.id === featureId);
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found inside document' });
    }

    res.json({ reviews: feature.reviews || [], averageRating: feature.averageRating || 0 });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get reviews', error: err.message });
  }
};


exports.deleteReview = async (req, res) => {
  const { featureId } = req.params;
  const email = req.user?.email;

  if (!featureId || !email) {
    return res.status(400).json({ message: 'Missing featureId or user email' });
  }

  try {
    const featureDoc = await Feature.findOne({ 'features.id': featureId });
    if (!featureDoc) {
      return res.status(404).json({ message: 'Feature not found' });
    }

    const feature = featureDoc.features.find(f => f.id === featureId);
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found inside document' });
    }

    const initialLength = feature.reviews?.length || 0;

    feature.reviews = (feature.reviews || []).filter(r => r.email !== email);

    if (feature.reviews.length === initialLength) {
      return res.status(404).json({ message: 'Review not found for this user' });
    }

    if (feature.reviews.length > 0) {
      const total = feature.reviews.reduce((sum, r) => sum + r.rating, 0);
      feature.averageRating = total / feature.reviews.length;
    } else {
      feature.averageRating = 0;
    }

    await featureDoc.save();

    res.status(200).json({ message: 'Review deleted successfully', averageRating: feature.averageRating });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete review', error: err.message });
  }
};

