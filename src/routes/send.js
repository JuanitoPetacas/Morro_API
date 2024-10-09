import { Router } from "express";
import { listSend, disableSend, updateSend } from "../controllers/send.js";


const Send = Router()

Send.put("/update/send", updateSend)
Send.get("/list/send", listSend)
Send.put("/disable/send",disableSend)


export default Send;
