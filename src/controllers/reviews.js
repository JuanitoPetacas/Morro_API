import review  from '../modules/review.js'
import fs from 'fs'



export const listReview = async (req, res) => {
    const list = await review.findAll()
    
    if(list.length>0)
    {
      res.send({list})
    }
    else{
      res.status(200).send({status:"no data", message:"not found data"})

    }
}

export const createReview = async (req, res) =>{
    try{
        
    const {calification,commentary,date_review,userIdUser} = req.body
    const file = req.file.path
    console.log(calification, commentary, date_review, userIdUser, file)
    const newReview = await review.create({
        calification: calification,
        commentary: commentary,
        date_review:date_review,
        photo: file,
        userIdUser: userIdUser,
    })
    res.status(200).send({status: 'review created', data: newReview})

    }
    catch(error){
        res.status(500).send({status: 'error', message:error.message});
    }

    
}

export const updateReview = async (req, res) =>{

  try {
    const {id_review, calification, commentary, date_review, userIdUser} = req.body
    const editedReview = await review.findByPk(id_review)
    const file = req.file.path
    if(editedReview){
        editedReview.calificaction = calification
        editedReview.commentary = commentary
        editedReview.date_review = date_review
        editedReview.photo = file
        editedReview.userIdUser = userIdUser
        await editedReview.save()
        res.status(200).send({message:'review edited', review: editedReview})

    }
  } catch (error) {

    res.status(500).send({status:'error', message: error.message})
  }


}

export const deteleReview = async (req,res) => {

    try {
        const {id_review} = req.body
        const deletedReview = await review.findByPk(id_review)
        if(deletedReview){
            await deletedReview.destroy()
            res.status(200).send({message:'review deleted', review: deletedReview})
        }
    } catch (error) {
        res.status(500).send({status:'error', message: error.message})
    }
 
}

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