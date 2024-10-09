import pay from '../modules/pay.js'


export const listPays = async (req,res)=>{
    const list = await pay.findAll()
    if(list.length>0){
        res.send({list})
    }
    else{
        res.status(200).send({message:'No pays found'})
    }
}

export const createPay = async (req,res) =>{
    try {
        const {amount,date_pay,pay_method,orderIdOrder} = req.body
    const payload = await pay.create({
        amount:amount,
        date_pay:date_pay,
        pay_method:pay_method,
        orderIdOrder:orderIdOrder,
    })
    res.status(200).send({ message:'pay successful', payload: payload})
    } catch (error) {

        res.status(500).send({ status: error.status, message: error.message})
        
    }

    
}
export const updatePay = async (req, res) => {
    try {
      const { id_pay, status } = req.body;
      console.log(id_pay);

      console.log(status)
  
      const payFound = await pay.findOne({ where: { id_pay: id_pay } });
      
      if (payFound) {
        payFound.status = status;
  
        await payFound.save();
        res.status(200).send({ message: 'Pay updated', pay: payFound });
      } else {
        res.status(404).send({ status: 'not found', message: 'Pay not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
  };
  


export const disablePay = async (req, res) =>{
    try {
        const {id_pay, method_pay, status} = req.body
        const newPay = await pay.findByPk(id_pay)
        if(newPay){

            newProduct.method_pay = method_pay
            newProduct.description = status
         
            await newPay.save()
            res.status(200).send({ message: 'Pay updated successfully', pay: newPay })

        }
    } catch (error) {
        res.status(500).send({ status: error.status, message: error.message})
        
    }
}