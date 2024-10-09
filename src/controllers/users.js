import users from '../modules/users.js'
import bcrypt from 'bcrypt'
import fs from 'fs'
import path from 'path'

export const listUser = async (req, res) => {
    const list = await users.findAll()

    if(list.length > 0) {
      res.send({list})
    }
    else{
     res.status(200).send({status: 'no data', message: 'no data in list'})
    }
    
}

export const foundUser = async (req,res)=>{
  try {
        const { id_user } = req.body
        const foundUser = await users.findByPk(id_user)
        
        if(foundUser){
            res.status(200).send({ message: 'user found', user: foundUser })
        } else {
            res.status(404).send({ message: 'user not found' })
        }
        
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Error finding user' })
    }
}


export const createUser = async (req, res) => {
    try {
      // Recibe los datos del usuario en el body de la solicitud
      const { name_user, email_user, password_user, address, phone, rol, status } = req.body;

      console.log(name_user, email_user, password_user, address, phone, rol)
  
      // Encripta la contraseña
      const password = encriptarPassword(password_user);

      
  
      // Si hay un archivo adjunto en la solicitud (opcional)
      const file = req.file.path;
  
      // Crea un nuevo usuario en la base de datos
      const newUser = await users.create({
        name_user,
        email_user,
        password_user: password,
        address,
        phone,
        photo: file, // Agrega el path de la foto si existe
        rol,
        status: 'active',
      });
  
      // Envía una respuesta exitosa si el usuario se creó correctamente
      res.send({ message: "User Created", user: newUser });
  
    } catch (error) {
      // Envía una respuesta de error en caso de fallo
      res.status(500).send({ message: "Error", error: error.message });
    }
  };

  export const updateUser = async (req,res)=>{
    try{
    
    const { id_user ,name_user, email_user, password_user ,address, phone , rol, status} = req.body;
    console.log(id_user)
    const photo = req.file.path
   
    const editUser = await users.findByPk(id_user);
    console.log(editUser)
    
    if(editUser) {
      editUser.name_user = name_user;
      editUser.email_user = email_user;
      editUser.address = address;
      editUser.password_user = password_user;
      editUser.phone = phone;
      editUser.photo = photo
      editUser.rol = rol;
      editUser.status = status;
      await editUser.save();
      res.send({ message: "User edited", user: editUser });
 
    }
    else{

      res.send({ message: "error", user: 'id not found' });
    }

   }
   catch (error){

    res.status(500).send({ message: "Error", error: error.message });
   }

  }

  
  export const disableUser = async (req, res) => {
    try {
      const { id_user } = req.body;
      const user = await users.findByPk(id_user); // Asegurarse que se espera el resultado con await
      
      if (user) {
        user.status = 'inactive'
        await user.save()
        res.status(200).send({ message: 'User Inactive', user: user })
      }
        
  
        
    } catch (error) {
      console.error('Error al desabilitar el usuario:', error);
      res.status(500).send({ message: 'Error deleting user', error: error.message });
    }
  };

  export const enableUser = async (req, res) => {
    try {
      const { id_user } = req.body;
      console.log(id_user)
      const user = await users.findByPk(id_user); // Asegurarse que se espera el resultado con await
      
      if (user) {
        user.status = 'active'
        await user.save()
        res.status(200).send({ message: 'User active', user: user })
      }
        
  
        
    } catch (error) {
      console.error('Error al activar el usuario:', error);
      res.status(500).send({ message: 'Error active user', error: error.message });
    }
  };
  

  export const login = async (req,res)=>{
    const {email_user , password_user} = req.body
    const user = await users.findOne({ where: { email_user: email_user }});
    if(user && bcrypt.compareSync(password_user, user.password_user) && user.status == "active"){
      res.send({ message: "Login successful", user: user });
    }
    else if(user.status == "inactive"){
      res.send({message: "user deactivated by administrator"})
    }
    else{
      res.send({message: "incorrect pass or email, verify your data"})
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

const encriptarPassword = (password) => {
  console.log(password)
  const saltrounds = 10
  const salt = bcrypt.genSaltSync(saltrounds);
  return bcrypt.hashSync(password, salt);
};

const comparePass = (pass, hashPass)=>{
  const isCorrectPass  = bcrypt.compareSync(pass,hashPass)
  return isCorrectPass
}