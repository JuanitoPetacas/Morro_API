import  order  from '../modules/order.js'
import  detail_order from '../modules/detail_order.js'
import send from '../modules/send.js'
import user from '../routes/users.js'
import pay from '../modules/pay.js'
import { stat } from 'fs'
import product from '../modules/products.js'


export const getOrders = async (req, res) => {
    const { userId } = req.body; // Asegúrate de que el userId se pasa en los parámetros

    try {
        // Obtener los pedidos del usuario
        const orders = await order.findAll({
            where: { userIdUser: userId },
            include: [{ model: detail_order} ]
             // Incluye los detalles del pedido
        });

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No se encontraron pedidos para este usuario.' });
        }

        return res.status(200).json(orders); // Devuelve los pedidos encontrados
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los pedidos', error });
    }
};

export const orderList = async (req,res)=>{
    try {
        const list = await order.findAll({include: detail_order})
        res.status(200).send({message: 'List of orders', list: list})
    } catch (error) {
        res.status(500).send({message: 'Error retrieving orders', error: error})
    }
}

export const updateOrder = async (req, res) => {
    try {
      const { id_order, status } = req.body;
      
      console.log(status);
  
      // Busca el pago en la base de datos por 'id_pay'
      const orderFound = await order.findOne({ where: { id_order: id_order } });
      
      if (orderFound) {
        // Si se encuentra, actualiza el estado del pago
        orderFound.status = status;
  
        await orderFound.save();  // Guarda los cambios
        res.status(200).send({ message: 'Order updated', order: orderFound });
      } else {
        // Si no se encuentra, devuelve un mensaje de error 404
        res.status(404).send({ status: 'not found', message: 'Order not found' });
      }
    } catch (error) {
      console.error(error);
      // En caso de error, devuelve un estado 500 con un mensaje de error
      res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
  };
  

export const obtainOrder = async (req,res)=>{
    const arrayProducts = req.body.products
    console.log(arrayProducts)
    try{
      
        const promise = arrayProducts.map(product => 
       
        detail_order.create(product)
      
        );

        await Promise.all(promise);

        res.status(200).send({message: 'Order generated successfully', order: promise})

       

    }
    catch(error){

        res.status(500).send({status: error, message: error.message})

    }
}

export const foundDetailOrder =  async (req,res)=>{
    try{
        const { id_order } = req.body
        const foundOrder = await order.findByPk(id_order, {include: detail_order})
        res.status(200).send({message: 'Detail order found', order: foundOrder})

    }
    catch(error){
        res.status(500).send({status: error, message: error.message})

    }
}

export const createOrder = async (req, res) => {
    const { userId, pay_method, status, agency, products } = req.body; // Asegúrate de que recibes userId y products

    try {
        // Calcular el total del pedido
        const total_price = products.reduce((total, productItem) => total + (productItem.price * productItem.quantity), 0);

        // Crear la cabecera del pedido
        const orderCreate = await order.create({
            date_order: new Date(),
            total_price,
            status: 'in progress', // o el estado que desees
            userIdUser: userId
        });

        const payCreate = await pay.create({
            amount: total_price,
            date_pay: new Date(),
            pay_method: pay_method,
            status: status,
            orderIdOrder: orderCreate.id_order, // ID del pedido
        });

        const sendCreate = await send.create({
            agency: agency,
            status: "pending",
            orderIdOrder: orderCreate.id_order, 
            payIdPay: payCreate.id_pay,  // ID del pago
        });

        // Crear los detalles del pedido y actualizar stock
        const orderDetails = [];

        for (const productItem of products) {
            // Encuentra el producto por su ID
            const productRecord = await product.findByPk(productItem.id_product);

            if (!productRecord) {
                throw new Error(`Product with ID ${productItem.id_product} not found`);
            }

            // Resta la cantidad comprada del stock disponible
            const newStock = productRecord.stock - productItem.quantity;
            if (newStock < 0) {
                throw new Error(`Insufficient stock for product ${productRecord.name_product}`);
            }

            // Actualiza el stock del producto
            await productRecord.update({ stock: newStock });

            // Agregar los detalles del pedido
            orderDetails.push({
                name_product: productItem.name_product,
                description: productItem.description,
                price_product: productItem.price,
                quantity_product: productItem.quantity,
                orderIdOrder: orderCreate.id_order,
                productIdProduct: productItem.id_product, // ID del producto
            });
        }

        await detail_order.bulkCreate(orderDetails);

        return res.status(201).json({
            message: 'Order created successfully',
            orderCreate
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating order', error });
    }
};



export const deleteOrder = async (req, res) => {
    try {
        const { id_order } = req.body
        const foundOrder = await order.findByPk(id_order)
        
        if(foundOrder){
            await foundOrder.destroy()
            res.status(200).send({ message: 'order deleted successfully' })
        }
        
    } catch (error) {
        res.status(500).send({ message: 'Error deleting order', error: error.message })
    }
}