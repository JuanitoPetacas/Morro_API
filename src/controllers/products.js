import detail_carshop from '../modules/detail_carshop.js'
import detail_order from '../modules/detail_order.js'
import orders from '../modules/order.js'
import products from '../modules/products.js'
import fs from 'fs'
import send from '../modules/send.js'



export const listProduct = async (req, res) => {
    const list = await products.findAll()
    if(list.length > 0) {
        res.send({list})
    }else{
        res.status(404).send({ message: 'No products found' })
    }
 
}

export const foundProduct = async (req,res)=>{
  const {id_product} = req.body
  const product = await products.findByPk(id_product)
    if(product) {
        res.send({product})
    } else {
        res.status(404).send({ message: 'Product not found' })
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name_product, description,price,stock, categoryIdCategory} = req.body
    const image = req.file.path
    const newProduct = await products.create({
        name_product: name_product,
        description:description,
        price:price,
        stock:stock,
        image_url: image,
        categoryIdCategory: categoryIdCategory,
        status: 'active',
       
    })
    res.status(200).send({ message: 'Product created successfully', product: newProduct })
    } catch (error) {
    res.status(500).send({ message: 'Error creating product', error: error.message })
    }
}

export const updateProduct = async (req, res) => {

    try {
        const {id_product,name_product, description, price, stock,categoryIdCategory} = req.body
        const image_url = req.file.path
        const newProduct = await products.findByPk(id_product)
        if(newProduct){
            newProduct.name_product = name_product
            newProduct.description = description
            newProduct.price = price
            newProduct.stock = stock
            newProduct.image_url = image_url
            newProduct.categoryIdCategory = categoryIdCategory
            newProduct.status = 'active'
          
            await newProduct.save()
            res.status(200).send({ message: 'Product updated successfully', product: newProduct })

        }

    

    } catch (error) {

        res.status(500).send({ message: 'Error updating product', error: error.message })
        
    }
}

export const disableProduct = async (req, res) => {
    try {
      const { id_product } = req.body;
      const product = await products.findByPk(id_product); // Asegurarse que se espera el resultado con await
      console.log(id_product)
      if (product) {
        product.status = 'inactive'
        await product.save()
        res.status(200).send({ message: 'Product Inactive', product: product })
      }
        
  
        
    } catch (error) {
      console.error('Error al desabilitar el producto:', error);
      res.status(500).send({ message: 'Error deleting product', error: error.message });
    }
  };

  export const enableProduct = async (req, res) => {
    try {
      const { id_product } = req.body;
      const product = await products.findByPk(id_product); // Asegurarse que se espera el resultado con await
      
      if (product) {
        product.status = 'active'
        await product.save()
        res.status(200).send({ message: 'Product active', product: product })
      }
        
  
        
    } catch (error) {
      console.error('Error al¿ activar el producto:', error);
      res.status(500).send({ message: 'Error active product', error: error.message });
    }
  };
  
    


export const file = async (req, res)=>{
    const photo = req.body.photo
    const path_api = './uploads/' + photo
    fs.access(path,(error)=>{
      if (!error) {
        return res.sendFile(path.resolve(path_api));
      } else {
        res.status(404).send({
          status: "error",
          mensaje: "no existe la imagen",
          error,
          photo,
          path_api,
        });
      }
  
    })
  }

