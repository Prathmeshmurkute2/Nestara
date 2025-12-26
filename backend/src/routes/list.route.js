import express from 'express';
import {
    createList,
    getAllLists,
    getListById,
    updateListById,
    deleteListById
} from '../controllers/list.controller.js';

const router = express.Router();

router.post('/listings', createList);
router.get('/listings', getAllLists);
router.get('/listings/:id', getListById);
router.put('/listings/:id', updateListById);
router.delete('/listings/:id', deleteListById);

export default router;