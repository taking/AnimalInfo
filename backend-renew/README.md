# animalinfo - backend
A RESTful API for Animalinfo Database with Node Express
---

## Installation & Run
```bash
git clone {project URL}
cd animalinfo/backend
yarn install
yarn run dev

API Endpoint : http://127.0.0.1:3000
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

## API

#### Lists
- users
- files (working)
- history (working)


Login
---
#### /gmcapi/v1/users/login
* `GET` : Login with Get JWT Token


Users
---
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


Data
---
#### /gmcapi/v1/data
* `GET` : Get all Data
* `POST` : Create a new data

#### /api/v1/data/id/:{id}
* `GET` : Get a Data [Id]
* `PATCH` : Update a Data
* `DELETE` : Delete a Data

#### /api/v1/data/refer/:{refer}
* `GET` : Get a Data [Refer]


Price
---
#### /gmcapi/v1/price/init
* `GET` : Init Database (Create Column)

#### /gmcapi/v1/price
* `GET` : Get Price

#### /gmcapi/v1/price/:price
* `PATCH` : Update a price


History
---
#### /gmcapi/v1/history
* `GET` : Get all Histories
* `POST` : Create a new History

#### /api/v1/history/id/:{id}
* `GET` : Get a History [Id]
* `DELETE` : Delete a History

#### /api/v1/history/name/:{name}
* `GET` : Get a History [Name]


---

### To do ✓
- [x] login/logout
- [x] session


### In Progress
- [x] data
- [x] history

### Done ✓
- [x] users
- [x] price