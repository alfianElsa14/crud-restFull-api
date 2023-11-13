# Basic Express

Basic express.js project with basic routes:
* Express
* Joi
* Fs

---

## URL

_Server_
```
http://localhost:3000
```
---


## Global Response

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


## RESTful endpoints

### POST /users/add

> Create users

_Request Header_
```
not needed
```

_Request Body_
```
{
  "fullName" : "<fullName>",
  "email" : "<email>"
  "password" : "<password>"
  "gender" : "<gender>"
}
```

_Response (201)_
```
{
    "users": {<data_users>},
    "message": "success"
}

```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"fullName\" is required"
}
```
```
{
    "message": "Email Already Exist"
}

```
```
{
    "status": "Validation Failed",
    "message": "\"password\" length must be at least 6 characters long"
}
```

---

### GET /users

> Get all users

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "fullName": "uya",
        "email": "sembarang@gmail.com",
        "password": "$2a$10$jTY5iqShOsrZd8ENjBrNzuX9MDtG9VvZjOQzMdfxYj3O8YyHEKCR6",
        "gender": "pria"
    },
    {
        "fullName": "kuya",
        "email": "kuya@gmail.com",
        "password": "$2a$10$1wfaZsFUZzz4KQANZZRCzumHZDzSiUcji4inYOrAiYfszdGk.hDCm",
        "gender": "pria"
    }
]
```

---

### GET /users/:email

 > Get by email

_Request Params_

```
/<users_email>/

```

_Request Header_

```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "selectedUser": [
        {
            "fullName": "kuya",
            "email": "kuya@gmail.com",
            "password": "$2a$10$1wfaZsFUZzz4KQANZZRCzumHZDzSiUcji4inYOrAiYfszdGk.hDCm",
            "gender": "pria"
        }
    ]
}
```

_Response (404)_
```
{
    "message": "Data Not Found"
}
```

---
### PUT /users/edit/:email

> Update by email

_Request Params_
```
/<users_email>/
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "fullName" : "<fullName>",
  "email" : "<email>"
  "password" : "<password>"
  "gender" : "<gender>"
}
```

_Response (200)_
```
{
    "users": [
        <users_list>
    ],
    "message": "success"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"password\" length must be at least 6 characters long"
}
```
```
{
    "status": "Validation Failed",
    "message": "\"fullName\" is required"
}
```

```
{
    "message": "Email Already Exist"
}
```

_Response (404 - Error Not Found)_
```
{
    "message": "Data Not Found"
}
```

---

### DELETE /users/:email

> Delete by email

_Request Params_
```
/<users_email>/
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": [
        [<users_list>]
    ],
    "message": "success"
}
```


_Response (404 - Error Not Found)_
```
{
    "message": "Data Not Found"
}
```

---
