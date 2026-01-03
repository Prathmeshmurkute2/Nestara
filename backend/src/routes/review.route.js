import express from 'express'
import {
    addReview,
    getReviewsByListing,
    deleteReview
} from '../controllers/review.controller.js'

const router=express.Router();

router.post('/:id/reviews',addReview);
router.get('/:id/reviews',getReviewsByListing);
router.delete('/:id/reviews/:reviewId', deleteReview)

export default router;