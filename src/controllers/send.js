import send from "../modules/send.js";
import orders from "../modules/order.js";
import pay from "../modules/pay.js";
import { where } from "sequelize";


export const listSend = async (req, res) => {
    try{
    const list = await send.findAll({ include: [orders, pay] })
    res.status(200).send({ list })
    }catch(error){
    res.status(400).send({ status: "error", error: error.message })
    }
}

export const updateSend = async (req, res) => {
    try {
      const { id_send, status } = req.body;
      console.log(id_send);
  
      const sendFound = await send.findOne({ where: { id_send: id_send } });
      
      if (sendFound) {
        sendFound.status = status;
  
        await sendFound.save();
        res.status(200).send({ message: 'send updated', send: sendFound });
      } else {
        res.status(404).send({ status: 'not found', message: 'send not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
  };

export const disableSend = async (req, res)=>{
    const { id_send, } = req.body;
    try {
        const foundSend = await send.findByPk(id_send)
        if(foundSend){
            await foundSend.update({ status: "cancelled" })
            res.status(200).send({ status: "cancelled", send: foundSend })

            const disableOrder = await orders.findByPk(foundSend.orderIdOrder)
            if(disableOrder){
                await disableOrder.update({ status: "cancelled" })
                res.status(200).send({ status: "cancelled", order: disableOrder })

                const disablePay = await pay.findByPk(foundSend.payIdPay)

                if(disablePay){
                    await disablePay.update({ status: "cancelled" })
                    res.status(200).send({ status: "cancelled", pay: disablePay })
                }
                else{
                    res.status(404).send({ status: "not found", message: "pay not found" })
                }
            }else{
                res.status(404).send({ status: "not found", message: "order not found" })
            }
        }else{
            res.status(404).send({ status: "not found", message: "send not found" })
        }
    }catch(error){

    }
}