const supabase = require("../Config/SupabaseConfig")

const getTask = async(req, res) => {
    try{
        const {data, error} = await supabase
            .from("TodoList")
            .select(`todo_id, todo_name, Tasks(task_id, task_name)`);
        if(error) throw error;
        res.status(200).send(data);
    }catch(error){
        res.status(500).json({error : error.message});
    }
}
const addTask = async (req, res) => {
    try{
        const {todo_id} = req.query;
        const {task_name, tags} = req.body;
        console.log(task_name, todo_id);
        const {data, error} = await supabase
            .from("Tasks")
            .insert([{task_name, tags, todo_id}])
            .select();
        if(error) throw error;
        res.status(201).json({message : "Task Created Successfully", data});
    }catch(error){
        res.status(500).json({error : error.message});
    }
}

const renameTask = async(req, res) => {
    try{
        const {id, todo_id} = req.params;
        const {new_name} = req.body;
        const {data, error} = await supabase
            .from("Tasks")
            .update({task_name : new_name})
            .eq('task_id', id)
            .eq('todo_id', todo_id)
            .select();
        if(error) throw error;
        res.status(200).json({message : "Task name updated Successfully", data});
    }catch(error){
        res.status(500).json({error : error.message});
    }
}

const deleteTask = async(req, res) => {
    try{
        const {id, todo_id} = req.params;
        const {data, error} = await supabase
            .from("Tasks")
            .delete()
            .eq('task_id', id)
            .eq('todo_id', todo_id)
        if(error) throw error;
        res.status(200).json({message : "Task is Successfully deleted"});
    }catch(error){
        res.status(500).json({error : error.message});
    }
}
module.exports = {
    getTask, addTask, renameTask, deleteTask
}

