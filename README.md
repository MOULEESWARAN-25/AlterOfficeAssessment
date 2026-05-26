# API Endpoints

## Authentication

### SignUP

POST : https://alter-office-assessment-backend.vercel.app/api/signup

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


### Login

POST : https://alter-office-assessment-backend.vercel.app/api/login

Body

{
    "email" : "moulee324@gmail.com",
    "password" : "alteroffice"
}


Response

{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5c..."
}


---

## CRUD operation for creating the todos

GET : https://alter-office-assessment-backend.vercel.app/api/todo

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


POST : https://alter-office-assessment-backend.vercel.app/api/todo

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


PATCH : https://alter-office-assessment-backend.vercel.app/api/todo/update-todo?id=7

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


DELETE : https://alter-office-assessment-backend.vercel.app/api/todo/delete-todo?id=5

Response

{
    "message": "Task is Successfully deleted"
}


---

## CRUD operation for creating the tasks inside the todos

GET : https://alter-office-assessment-backend.vercel.app/api/task/

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


POST : https://alter-office-assessment-backend.vercel.app/api/task?todo_id=7

Body

{
    "task_name" : "Completed the backend api endpoints",
    "tags" : "#Important"
}


Response

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


PATCH : https://alter-office-assessment-backend.vercel.app/api/task/update-task?id=21&todo_id=7

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


DELETE : https://alter-office-assessment-backend.vercel.app/api/task/delete-task?id=21&todo_id=7

Response

{
    "message": "Task is Successfully deleted"
}

---

## Database Schema & Optimization Guidelines

To support this API, create the following PostgreSQL tables (e.g., in Supabase). Indexes have been added to optimize key retrieval paths.

### 1. Users Table
Tracks registration credentials. The `email` field is indexed to ensure login query performance.

```sql
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Optimize login and uniqueness check lookups
CREATE INDEX idx_users_email ON Users(email);
```

### 2. Todos Table
Tracks high-level project lists.

```sql
CREATE TABLE Todos (
    todo_id SERIAL PRIMARY KEY,
    todo_name VARCHAR(255) NOT NULL,
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_todos_user_id ON Todos(user_id);
```

### 3. Tasks Table
Tracks individual items inside a Todo.

```sql
CREATE TABLE Tasks (
    id SERIAL PRIMARY KEY,
    task_name TEXT NOT NULL,
    tags VARCHAR(100),
    todo_id INT REFERENCES Todos(todo_id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Optimize join operations when retrieving tasks for a specific todo list
CREATE INDEX idx_tasks_todo_id ON Tasks(todo_id);
```
