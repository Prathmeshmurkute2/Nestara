import express from 'express'
import {
    addReview,
    getReviewsByListing,
    deleteReview
} from '../controllers/review.controller.js'
import { isAuthenticated } from '../middleware/isAuth.middleware.js';

const router=express.Router();

router.use(isAuthenticated)

router.post('/:id/reviews',addReview);
router.get('/:id/reviews',getReviewsByListing);
router.delete('/:id/reviews/:reviewId', deleteReview)

export default router;