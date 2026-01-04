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

const router = express.Router();

router.get('/listings', getAllLists);
router.get('/listings/:id', getListById);

router.use(isAuthenticated)

router.post('/listings',upload.single('image'), createList);

router.put('/listings/:id', upload.single('image'), updateListById);

router.delete('/listings/:id', deleteListById);

export default router;