import express from "express"; 
import cors from 'cors'
import path from "path";
import dotenv from 'dotenv'
import sequelize,{models} from './src/modules/associations.js'
import  user  from "./src/routes/users.js"
import Review  from "./src/routes/review.js"
import  product  from "./src/routes/products.js"
import  Pay  from "./src/routes/pay.js"
import  Order  from "./src/routes/order.js"
import Carshop  from "./src/routes/carshop.js"
import Categories from "./src/routes/categories.js";
import Send  from "./src/routes/send.js";
import { fileURLToPath } from 'url';




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
    origin: '*', // Especifico la direccion de origen de la peticion
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Indico que peticiones http se van usar
    allowedHeaders: ['Content-Type', 'Authorization'] // Autoriza a los headers
};

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config()


const port = process.env.PORT || 3000;

app.use(user)
app.use(Categories)
app.use(Review)
app.use(product)
app.use(Pay)
app.use(Order)
app.use(Carshop)
app.use(Send)



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

sequelize
.sync({force:false})
.then(()=>{
    console.log('base de datos sincronizada')
})
.catch((error)=>{
    console.log(`error en la sincronizacion: ${error}`)
})


