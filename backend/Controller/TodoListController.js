const supabase = require("../Config/SupabaseConfig")

const getTodo = async(req, res) => {
    try{
        const {data, error} = await supabase
            .from("TodoList")
            .select("*")
            .eq('user_id', req.user.id);
        if(error) throw error;
        res.status(200).send(data);
    }catch(error){
        res.status(500).json({error : error.message});
    }
}
const addTodo = async (req, res) => {
    try{
        const todo_name = req.body.todo_name;
        const {data, error} = await supabase
            .from("TodoList")
            .insert([{todo_name, user_id: req.user.id}])
            .select();
        if(error) throw error;
        res.status(201).json({message : "Task Created Successfully", data});
    }catch(error){
        res.status(500).json({error : error.message});
    }
}

const renameTodo = async(req, res) => {
    try{
        const {id} = req.query;
        const {new_name} = req.body;
        const {data, error} = await supabase
            .from("TodoList")
            .update({todo_name : new_name})
            .eq('todo_id', id)
            .eq('user_id', req.user.id)
            .select();
        if(error) throw error;
        res.status(200).json({message : "Task name updated Successfully", data});
    }catch(error){
        res.status(500).json({error : error.message});
    }
}

const deleteTodo = async(req, res) => {
    try{
        const {id} = req.query;
        const {data, error} = await supabase
            .from("TodoList")
            .delete()
            .eq('todo_id', id)
            .eq('user_id', req.user.id);
        if(error) throw error;
        res.status(200).json({message : "Task is Successfully deleted"});
    }catch(error){
        res.status(500).json({error : error.message});
    }
}
module.exports = {
    getTodo, addTodo, renameTodo, deleteTodo
}

