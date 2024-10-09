import { Router } from "express";
import { listReview, createReview, updateReview, deteleReview, file } from "../controllers/reviews.js";
import multer from "multer";
const ram  = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, "Review-" + Date.now() + '-' + file.originalname);
    }
})

const uploads =  multer({storage: ram})
const Review = Router()

Review.get("/list/Review", listReview);
Review.post("/create/Review", uploads.single("photo"), createReview)
Review.put("/update/Review",uploads.single("photo"), updateReview)
Review.delete("/delete/Review", deteleReview)
Review.post("/getImg/Review", file)

export default Review;