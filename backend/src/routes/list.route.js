import express from 'express';
import {
    createList,
    getAllLists,
    getListById,
    updateListById,
    deleteListById
} from '../controllers/list.controller.js';
import { upload } from '../middleware/upload.middleware.js';
import { isAuthenticated } from '../middleware/isAuth.middleware.js';
import isOwner from '../middleware/isOwner.middleware.js';

const router = express.Router();

router.get('/listings', getAllLists);
router.get('/listings/:id', getListById);


router.post('/listings',isAuthenticated,upload.single('image'), createList);

router.put('/listings/:id',isAuthenticated, isOwner , upload.single('image'), updateListById);

router.delete('/listings/:id',isAuthenticated, isOwner, deleteListById);

export default router;