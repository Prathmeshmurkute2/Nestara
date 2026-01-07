import express from "express";
import { searchListings } from "../controllers/search.Controller.js";

const router = express.Router();

router.get("/", searchListings);

export default router;
