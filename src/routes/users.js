import { Router } from "express";
import { listUser, createUser, updateUser, disableUser, enableUser,  login, file , foundUser} from "../controllers/users.js";
import multer from "multer";
const ram  = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, "user-" + Date.now() + '-' + file.originalname);
    }
})

const uploads =  multer({storage: ram})
const user = Router()

user.post("/found/user", foundUser)
user.get("/list/users", listUser);
user.post("/create/user", uploads.single("photo"), createUser)
user.put("/update/user", uploads.single("photo"), updateUser)
user.post("/disable/user", disableUser)
user.post("/enable/user", enableUser)
user.post("/login/user", login)
user.post("/getImg", file)

export default user