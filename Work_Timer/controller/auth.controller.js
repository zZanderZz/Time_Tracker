// const funcionariosRepository = require("../repository/funcionarios.repository");
const Post = require('../models/post')

module.exports = {
    auth: async (req, res) =>{
        const { email, password } = req.body;

        const data = await Post.findAll( { where : [{email : email}]});
        
        console.log(data);
        if( data.password == password){
            return res.send("DEU CERTO!")
        }

        return res.send("DEU ERRODO!");
    }
};

