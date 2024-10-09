import { sequelize } from "./morrodb.js";
import carshop from "./carshop.js";
import categories from "./categories.js";
import detail_order from "./detail_order.js";
import detail_carshop from "./detail_carshop.js";
import orders from "./order.js";
import pay from "./pay.js";
import product from "./products.js";
import review from "./review.js";
import users from "./users.js";
import send from "./send.js";

const models = {carshop, categories, detail_order, detail_carshop, orders, pay, product, review, users, send}

Object.keys(models).forEach(modelName => {
    if ("associate" in models[modelName]) {
        models[modelName].associate(models);
    }
})

export {models}
export default sequelize