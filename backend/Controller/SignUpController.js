const supabase = require("../Config/SupabaseConfig")
const bcrypt = require('bcrypt');





const CreateUser = async (req, res) => {
    try{
        let {name, email, password} = req.body;
        if(!name || !email || !password) res.status(400).json({error : "Some of the fields are missing"});
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(password);
        const {data, error} = await supabase
            .from("Users")
            .insert([{name, email, password : hashedPassword}])
            .select();
        if(error) throw error;
        res.status(201).json({message : "User created successfully", data});
    }catch(error){
        res.status(500).json({error : error.message});
    }
}

module.exports = {
    CreateUser
}

