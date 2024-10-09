import categories from "../modules/categories.js";


export const createCategory = async (req, res) => {

    try {
        const {name_category,description} = req.body
        const categoryArray = await categories.create({
            name_category: name_category,
            description: description
        })
        res.status(200).send({message: 'category created successfully', categories: categoryArray})
    } catch (error) {
        res.status(500).send({message: 'Error creating category', error: error})
    }
}

export const deleteCategory = async (req, res) =>{

    try {
        const { id_category } = req.body
        const foundCategory = await categories.findByPk(id_category)
        
        if(foundCategory){
            await foundCategory.destroy()
            res.status(200).send({ message: 'category deleted successfully' })
        }
        
    } catch (error) {
        res.status(500).send({ message: 'Error deleting category', error: error.message })
    }
}

export const foundCategory = async (req, res) =>{
    try {
        const { id_category } = req.body
        const foundCategory = await categories.findByPk(id_category)
        
        if(foundCategory){
            res.status(200).send({ message: 'category found', category: foundCategory })
        } else {
            res.status(404).send({ message: 'category not found' })
        }
        
    } catch (error) {
        res.status(500).send({ message: 'Error finding category', error: error.message })
    }
}

export const listCategories = async (req, res) => {

    try {
        const categoriesArray = await categories.findAll()
        res.status(200).send({message: 'categories listed', categories: categoriesArray})
    } catch (error) {
        res.status(500).send({message: 'Error listing categories', error: error})
    }
}



