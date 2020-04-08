# Kanban-Server

**Base URL**

http://localhost:3000

# User

***Signup***
----
  Returns new User.

* **URL**

  /signup

* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Data Params**

  * **Required:**
  ````
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }
  ````

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      "name": "tester",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. eyJpZCI6MSwibmFtZSI6InRlc3RlciIsImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsImlhdCI6MTU4NjM1MzYzMn0.so_v7WBwYcQu8Xlxlz-2jwm3CDd-Bv9oG-IlRgAOHdQ"
    }
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ error : "SequelizeValidationError" }`

  OR

  * **Code:** 500 <br />

* **Sample Call:**

  ```javascript
    
  ```

----
----
***Signin***
----
  Returns User.

* **URL**

  /signin

* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Data Params**

  * **Required:**
  ````
    {
      email: req.body.email,
      password: req.body.password,
    }
  ````

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      "name": "tester",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. eyJpZCI6MSwibmFtZSI6InRlc3RlciIsImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsImlhdCI6MTU4NjM1MzYzMn0.so_v7WBwYcQu8Xlxlz-2jwm3CDd-Bv9oG-IlRgAOHdQ"
    }
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** {
    "message": "Invalid email or password",
    "errors": [
        "Invalid email or password"
      ]
    }

  OR

  * **Code:** 500 <br />

* **Sample Call:**

  ```javascript
    
  ```

----

# Task

***Create***
----
  Returns new task.

* **URL**

  /task

* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Data Params**

   **Required:**
  ````
    {
      title: req.body.title
    }
  ````

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
    "task": {
        "category": "Backlog",
        "id": 1,
        "title": "test",
        "UserId": 1,
        "updatedAt": "2020-04-08T13:53:57.123Z",
        "createdAt": "2020-04-08T13:53:57.123Z"
      }
    }

 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ error : "SequelizeValidationError" }`

  OR

  * **Code:** 500 <br />

* **Sample Call:**

  ```javascript
    
  ```

----
***Display***
----
  Returns all task.

* **URL**

  /task

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      {
        "id": 1,
        "title": "test",
        "category": "Backlog",
        "UserId": 1,
        "createdAt": "2020-04-08T13:53:57.123Z",
        "updatedAt": "2020-04-08T13:53:57.123Z",
        "User": {
            "id": 1,
            "name": "tester",
            "email": "test@mail.com",
            "createdAt": "2020-04-08T13:47:12.670Z",
            "updatedAt": "2020-04-08T13:47:12.670Z"
        }
      }
    ]
  ```
 
* **Error Response:**

  * **Code:** 500 <br />


* **Sample Call:**

  ```javascript

  ```

----
***Update***
---
----
  Returns Updated task.

* **URL**

  /task/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  * **Required:**
  ````
    {
      category: req.body.category
    }
  ````

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "id": 1,
      "title": "test",
      "category": "Production",
      "UserId": 1,
      "createdAt": "2020-04-08T13:53:57.123Z",
      "updatedAt": "2020-04-08T14:00:44.876Z"
    }

* **Error Response:**

  * **Code:** 500 <br />

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "message": 'NotFound',
    "errors": [
        'Item not found'
      ]
    }`

  OR

  * **Code:** 400  <br />
    **Content:** `{ error : "SequelizeVlaidationError" }`

* **Sample Call:**

  ```javascript
    
  ```

----
***Delete***
----
  Returns deleted task.

* **URL**

  /task/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

  * **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
  **Content:** 
    ```
    {
    "message": "Delete success",
    "deletedTask": {
        "id": 2,
        "title": "test",
        "category": "Production",
        "UserId": 1,
        "createdAt": "2020-04-08T14:08:46.307Z",
        "updatedAt": "2020-04-08T14:09:02.035Z"
      }
    }
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
     **Content:** `{
    "message": 'NotFound',
    "errors": [
        'Item not found'
      ]
    }`

  OR

  * **Code:** 500  <br />

  OR

  * **Code:** 401  <br />
    **Content:** `{ error : "Not authenticated" }`



* **Sample Call:**

  ```javascript

  ```
---