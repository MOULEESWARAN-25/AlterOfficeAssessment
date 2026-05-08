const supabase = require("../Config/SupabaseConfig")

const CreateUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const {data, error} = await supabase
            .from("Users")
            .insert([{name, email, password}])
            .select();
        if(error) throw error;
        if(!name || !email || !password) res.status(400).json({error : "Some of the fields are missing"});
        res.status(201).json({message : "User created successfully", data});
    }catch(error){
        res.status(500).json({error : error.message});
    }
}

module.exports = {
    CreateUser
}

