const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const {id: Id} = req.params;
    const campground = await Campground.findById(Id);
    const review = await Review(req.body.review)
    review.author = req.user._id;
    campground.reviews.push(review);
    await campground.save();
    await review.save();
    req.flash('success', 'Successfully made a new review');
    res.redirect(`/campgrounds/${Id}`);
}

module.exports.deleteReview = async (req, res) => {
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, { $pull : { reviews : reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/campgrounds/${id}`);
}