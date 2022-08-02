# animalinfo - backend
A RESTful API for Animalinfo Database with Node Express
---

## Installation & Run
```bash
# Download this project
git clone {project URL}
```


Before running API server, you should set the .env file with yours or set the your .env with my values on [.env]
```
# DB Configurations
DB_HOST=localhost
DB_PORT=3306
DB_USER=db_username
DB_PASS=db_password
DB_DATABASE=db_name

# local runtime configs
PORT=3000
SECRET_JWT=supersecret
```

```bash
# Build and Run
cd animalinfo/backend
yarn install
yarn run dev

API Endpoint : http://127.0.0.1:3000
```


## API

#### Lists
- users
- files (working)
- history (working)


---
#### /gmcapi/v1/users/login
* `GET` : Login with Get JWT Token

#### /gmcapi/v1/users
* `GET` : Get all Users
* `POST` : Create a new User

#### /api/v1/users/id/:{id}
* `GET` : Get a User [Id]
* `PATCH` : Update a User
* `DELETE` : Delete a User

#### /api/v1/users/name/:{id}
* `GET` : Get a User [Name]

#### /api/v1/users/whoami
* `GET` : Get a Login User

#### /api/v1/users/id/status/:{id}
* `PATCH` : Change User Account Status

---

### To do ✓
- [x] login/logout
- [x] session


### In Progress
- [x] files
- [x] history

### Done ✓
- [x] users
- [x] price