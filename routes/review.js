const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapasync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js"); 
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const reviewController = require("../controllers/review.js");

//post review route 
router.post("/",validateReview, isLoggedIn,reviewController.createReview);

//Delete review Route 
router.delete("/:reviewId", isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview)
);

module.exports = router ; 