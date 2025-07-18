import express from "express";
import { protect } from "../middleware/authMiddleware";
import { getUserData, storeRecentSearchedCities } from "../controllers/userController";

const userRouter=express.Router();

userRouter.get('/',protect,getUserData);
userRouter.post('/store-recent-search',protect,storeRecentSearchedCities);

export default userRouter;