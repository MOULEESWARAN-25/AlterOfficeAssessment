# AlterOffice Assessment

## Deployed Links

- **Frontend Application**: [https://todolist-alteroffice.vercel.app/](https://todolist-alteroffice.vercel.app/)
- **Backend API**: [https://todo-app-alteroffice.vercel.app/](https://todo-app-alteroffice.vercel.app/)

---

# API Endpoints

## Authentication

### SignUP

POST : https://todo-app-alteroffice.vercel.app/api/signup

Body
```json
{
    "name" : "mouleeswaran",
    "email" : "moulee324@gmail.com",
    "password" : "alteroffice"
}
```

Response
```json
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
```

### Login

POST : https://todo-app-alteroffice.vercel.app/api/login

Body
```json
{
    "email" : "moulee324@gmail.com",
    "password" : "alteroffice"
}
```

Response
```json
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5c..."
}
```

---

## CRUD operation for creating the todos

GET : https://todo-app-alteroffice.vercel.app/api/todo

Response
```json
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
```

POST : https://todo-app-alteroffice.vercel.app/api/todo

Body
```json
{
    "todo_name" : "AlterOffice Task"
}
```

Response
```json
{
    "message": "Task Created Successfully",
    "data": [
        {
            "todo_id": 7,
            "todo_name": "AlterOffice Task"
        }
    ]
}
```

PATCH : https://todo-app-alteroffice.vercel.app/api/todo/update-todo?id=7

Body
```json
{
    "new_name" : "AlterOffice Assessment"
}
```

Response
```json
{
    "message": "Task name updated Successfully",
    "data": [
        {
            "todo_id": 7,
            "todo_name": "AlterOffice Assessment"
        }
    ]
}
```

DELETE : https://todo-app-alteroffice.vercel.app/api/todo/delete-todo?id=5

Response
```json
{
    "message": "Task is Successfully deleted"
}
```

---

## CRUD operation for creating the tasks inside the todos

GET : https://todo-app-alteroffice.vercel.app/api/task/

Response
```json
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
```

POST : https://todo-app-alteroffice.vercel.app/api/task?todo_id=7

Body
```json
{
    "task_name" : "Completed the backend api endpoints",
    "tags" : "#Important"
}
```

Response
```json
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
```

PATCH : https://todo-app-alteroffice.vercel.app/api/task/update-task?id=21&todo_id=7

Body
```json
{
    "new_name" : "Completed the backend api endpoints for tasks and todos"
}
```

Response
```json
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
```

DELETE : https://todo-app-alteroffice.vercel.app/api/task/delete-task?id=21&todo_id=7

Response
```json
{
    "message": "Task is Successfully deleted"
}
```