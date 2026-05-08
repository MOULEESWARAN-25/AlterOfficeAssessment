const supabase = require("../Config/SupabaseConfig")

const getTodo = async(req, res) => {
    try{
        const {data, error} = await supabase
            .from("TodoList")
            .select("*");
        if(error) throw error;
        res.status(200).send(data);
    }catch(error){
        res.status(500).json({error : error.message});
    }
}
const addTodo = async (req, res) => {
    try{
        const todo_name = req.body.todo_name;
        // console.log(todo_name);
        const {data, error} = await supabase
            .from("TodoList")
            .insert([{todo_name}])
            .select();
        if(error) throw error;
        res.status(201).json({message : "Task Created Successfully", data});
    }catch(error){
        res.status(500).json({error : error.message});
    }
}

const renameTodo = async(req, res) => {
    try{
        const {id} = req.params;
        const {new_name} = req.body;
        const {data, error} = await supabase
            .from("TodoList")
            .update({todo_name : new_name})
            .eq('todo_id', id)
            .select();
        if(error) throw error;
        res.status(200).json({message : "Task name updated Successfully", data});
    }catch(error){
        res.status(500).json({error : error.message});
    }
}

const deleteTodo = async(req, res) => {
    try{
        const {id} = req.params;
        const {data, error} = await supabase
            .from("TodoList")
            .delete()
            .eq('todo_id', id);
        if(error) throw error;
        res.status(200).json({message : "Task is Successfully deleted"});
    }catch(error){
        res.status(500).json({error : error.message});
    }
}
module.exports = {
    getTodo, addTodo, renameTodo, deleteTodo
}

