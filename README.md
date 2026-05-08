# Api End points

# SignUP

POST : http://localhost:5000/api/signup

Body
{
    "name" : "mouleeswaran",
    "email" : "moulee324@gmail.com",
    "password" : "alteroffice"
}

Response
{
    "message": "User created successfully",
    "data": [
        {
            "id": 6,
            "name": "mouleeswaran",
            "email": "moulee324@gmail.com",
            "password": "$2b$10$uIWUrc1IpIG9QAFUPjDq1OjW0G9VMalGPkcAIPAt.mglhrk1fZLDK"
        }
    ]
}



# CRUD operation for creating the todos

GET : http://localhost:5000/api/todo

Response
[
    {
        "todo_id": 5,
        "todo_name": "Groceries"
    },
    {
        "todo_id": 6,
        "todo_name": "PendingTasks"
    }
]





POST : http://localhost:5000/api/todo

Body
{
    "todo_name" : "AlterOffice Task"
}

Response
{
    "message": "Task Created Successfully",
    "data": [
        {
            "todo_id": 7,
            "todo_name": "AlterOffice Task"
        }
    ]
}




PATCH : http://localhost:5000/api/todo/update-todo?id=7

Body
{
    "new_name" : "AlterOffice Assessment"
}

Response
{
    "message": "Task name updated Successfully",
    "data": [
        {
            "todo_id": 7,
            "todo_name": "AlterOffice Assessment"
        }
    ]
}




DELETE : http://localhost:5000/api/todo/delete-todo?id=5

Response
{
    {
    "message": "Task is Successfully deleted"
    }
}


# CRUD operation for creating the tasks inside the todos

GET : http://localhost:5000/api/task/

Response
[
    {
        "todo_id": 6,
        "todo_name": "PendingTasks",
        "Tasks": []
    },
    {
        "todo_id": 7,
        "todo_name": "AlterOffice Assessment",
        "Tasks": []
    }
]

POST : http://localhost:5000/api/task?todo_id=7

Body
{
    "task_name" : "Completed the backend api endpoints",
    "tags" : "#Important"
}

Response
{
    {
    "message": "Task Created Successfully",
    "data": [
        {
            "id": 21,
            "task_name": "Completed the backend api endpoints",
            "tags": "#Important",
            "todo_id": 7
        }
    ]
    }
}

PATCH : http://localhost:5000/api/task/update-task?id=21&todo_id=7

Body
{
    "new_name" : "Completed the backend api endpoints for tasks and todos"
}

Response
{
    "message": "Task name updated Successfully",
    "data": [
        {
            "id": 21,
            "task_name": "Completed the backend api endpoints for tasks and todos",
            "tags": "#Important",
            "todo_id": 7
        }
    ]
}

DELETE : http://localhost:5000/api/task/delete-task?id=21&todo_id=7

Response
{
    "message": "Task is Successfully deleted"
}