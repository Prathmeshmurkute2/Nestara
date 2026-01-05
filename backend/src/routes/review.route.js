import express from 'express'
import {
    addReview,
    getReviewsByListing,
    deleteReview
} from '../controllers/review.controller.js'
import { isAuthenticated } from '../middleware/isAuth.middleware.js';
import { isLoggedIn } from '../middleware/isLoggedIn.middleware.js';

const router=express.Router();


router.post('/:id/reviews',isAuthenticated, isLoggedIn, addReview);
router.get('/:id/reviews',getReviewsByListing);
router.delete('/:id/reviews/:reviewId',isAuthenticated,isLoggedIn, deleteReview)

export default router;