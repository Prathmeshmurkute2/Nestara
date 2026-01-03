import express from 'express'
import {
    addReview,
    getReviewsByListing
} from '../controllers/review.controller.js'

const router=express.Router();

router.post('/:id/reviews',addReview);
router.get('/:id/reviews',getReviewsByListing);

export default router;