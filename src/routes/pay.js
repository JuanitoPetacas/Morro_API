import { Router } from "express";
import {  createPay, disablePay, listPays, updatePay} from "../controllers/pays.js";

const Pay = Router()

Pay.put("/update/Pay", updatePay)
Pay.get("/list/Pay", listPays)
Pay.post("/create/Pay",createPay)
Pay.put("/disable/Pay", disablePay)

export default Pay;
