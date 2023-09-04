# Triveousbackend
- Triveous is the ecoomerce site for the shoppind with different categories of the products.

# Deployed link:
https://ecommercebackend-4diz.onrender.com/

# Documentation link
- the documentation can be accessed throught the followin url.

https://ecommercebackend-4diz.onrender.com/api-docs/

# Tech stacks users
- Node.js
- Express.js
- MongoDB
- Nodemon
- swagger
- postman
- VS code
- GitHub


# Guidelines to run app

### Deployed link
https://ecommercebackend-4diz.onrender.com/

### Run locally
- install the all basic dependencies by npm install
- start the app locally by command npm start
- the app will start on the localhost:8000 port
- by insert the routes we can access the data and perform the functionality

# API's

## User:

### Get all users
-GET /api/user/alluses
- authenticated
- authorised

- Response: 
            {
                get all users information
            }

### Register the user
- POST /api/user/register

#### Request: 
                {
                    "firstname":"Indu",
                    "lastname":"Sanap",
                    "email":"indusanap@gmail.com",
                    "password":"Indu@0123"
                }

#### Response:
                {
                    "message": "user registration is successfully",
                    - password will be in hashed form
                }

### Login
- POST /api/user/login

#### Request: 
                {
                    email: String
                    password: String
                }

#### Response: 
                {
                    accessToken: String,
                    refreshToken: string
                }
### RefreshToken:
- GET /api/user/refreshtoken

#### Response:
- get refreshtoken to access the accessToken


## Category:

### get all category:
- GET /api/category/allcategories

- Response: get list of all categories

### get category by id:
- GET /api/category/:caegoryid

### Create the category:
- POST /api/category/create
- Protected
- Authorised
### edit the category
- PATCH /api/category/edit/:id
- Protected
- Authorised
### Delete the category:
- Delete /api/category/delete/:id
- Protected
- Authorised

## Product listing:

### Get all products:
- GET /api/product/allproducts

- Response:
            {
                [Get a list of all products.]
            }

### Get product by id:
- GET /api/product/:id

### Create product
- POST /api/product/create
- Authenticated
- Authorised

- Request:
                {
                    title,
                    description,
                    price,
                    image,
                    color,
                    ratings,
                    availability,
                    brand,
                    category,
                }

### Edit the product details:
- PATCH /api/product/edit/:id
- Protected
- Authorised

### Delete the product:
- DELETE /api/product/delete/:id
- Protected
- Authorised

## Cart routes

### Get a cart by user id:

- GET /api/cart/:id/all
- Authenticated
- Response: Get all all items in cart

### Add the item to cart

- POST /api/cart/add
- Authenticated
- Request:  
            {
                productId,
                count
            }

### delete the item from cart

- DELETE /api/cart//delete/:productId
- Authenticated

### Increate the count the the item in cart

- PATCH /api/cart//increase/:productId
- Authenticated

## Order Routes:

### Place order:
- POST /api/order/place-order
- Authenticated

- Request :
                {
                    userId
                }

### Order History:
- GET /api/order/order-history
- Authenticated

### Get order details by id:
- GET /api/order/:orderId
- Authenticated
### Update the order status
- PATCH /api/order//change-status/:orderId
- Authenticated
- Authorised






